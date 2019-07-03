import { Injectable, EventEmitter } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { AgvModel, ITaskViewModel } from './task.model';
import { TaskRequestService, IPostTask, IPostAction } from './task.request';
import { Observable, of, observable, Subject } from 'rxjs';
import { agvConfig } from './task.config';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { SOCKET_URL } from 'src/app/config';

enum RunStatus {
  stop,
  move
}

enum IsActive {
  charge,
  working,
  wait
}

enum TaskType{
  working = 1,
  charge
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private socket: any;
  agvList: Array<AgvModel> = [];
  taskList: ITaskViewModel[] = [];
  actionList: string[] = [];
  A_agv: AgvModel;
  B_agv_active: AgvModel;
  selectB_agv: AgvModel;

  A_agv_EventEmitter: EventEmitter<any> = new EventEmitter();
  B_agv_EventEmitter: EventEmitter<any> = new EventEmitter();

  BatteryRfid = 1000;
  currentTask: ITaskViewModel;

  logEvent: Subject<any> =  new Subject();
  constructor(private taskReqSev: TaskRequestService, private message: NzMessageService) {
    for (let i = 0; i < 4; i++) {
      this.agvList.push(new AgvModel({
        AgvName: `AGV0${i + 1}`
      }))
    }
    this.getAgvList()
    this.initSocket()
  }

  initSocket(): void {
    this.socket = socketIo(SOCKET_URL);
    // console.log(this.socket)
    // 监听agv变化
    this.socket.on('getAgvInfo', (res) => {
      this.dealWithAgvInfo(res)
    })


    console.log('init socket')
  }

  //更新agv info
  dealWithAgvInfo(res) {
    if (res.type != 1) {
      return;
    }
    let agvInfo = new AgvModel(res.data)
    let finder = this.agvList.findIndex(agv => {
      return agv.AgvName == agvInfo.AgvName
    })
    if (finder == -1) {
      this.agvList.push(agvInfo)
    } else {
      this.agvList[finder] = agvInfo;
    }
    this.A_agv_EventEmitter.emit(this.agvList);
    this.B_agv_EventEmitter.emit(this.agvList)

  }

  async getTaskList() {
    let res = await this.taskReqSev.getTaskList();
    if (res.success) {
      this.taskList = [];
      res.data.forEach(element => {
        this.taskList.push(element)
      });
      console.log(this.taskList)
    }
  }

  async getCurrentTask() {
    await this.getTaskList()
    let firstUnfinishTask = this.taskList.find(task => {
      return task.isFinished == 0;
    })
    this.currentTask = firstUnfinishTask;
  }

  /**
   * 获取agv历史数据
   */
  async getAgvList() {
    this.agvList = [];
    let res = await this.taskReqSev.getAllAgvs()
    console.log(res)
    if (res.length>0) {
      res.forEach(async (agv, index) => {
          this.agvList[index] = new AgvModel(agv);
      })
    }
    console.log(this.agvList)
  }

  /**
   * 开始任务
   */
  async startTask() {
    await this.getCurrentTask();
    await this.getAgvList();
    if(!this.currentTask){
      this.log('所有任务已全部完成');
      return;
    }
    let targetFrame = this.currentTask.r_frame;
    this.A_agv = this.agvList[0];
    let startPort = this.A_agv.Rfid;
    let endPort = targetFrame.stopAgv1;
    ///////////////调用agv移动接口///////////////
    
    this.findenableB_agv(targetFrame);
    this.log(`BAGV(AGV01)调用posttask，由${startPort}移动到${endPort}`)
    await this.agvMove(this.A_agv.AgvName, startPort, endPort)
    let aa = {
      AgvName: this.A_agv.AgvName,
      RunStatus: RunStatus.move,
      IsActive: IsActive.working
    }
    await this.taskReqSev.updateAgvInfo(aa)
    //////////////////监听agv位置///////////////
    

    
  }

  listenAgvRfid(agvName, endPort): Promise<AgvModel> {
    let that = this;
    return new Promise(function (resolve, reject) {
      let timer = setInterval(async () => {
        let res = await that.taskReqSev.getAgvByName(agvName);
        that.message.info('等待'+agvName+'到达'+endPort+'（2秒监听一次）')
        if (res.Rfid == endPort) {
          clearInterval(timer);
          that.log(`${agvName}已到达${endPort}`)
          resolve(res);
        }
      }, 3000);
    })
  }


  /**
   * B型agv运动
   * @param targetFrame 
   */
  async findenableB_agv(targetFrame) {
    await this.getAgvList();
    // 查找正在工作的agv
    let finder = this.agvList.find(agv => {
      return agv.AgvName != 'AGV01' && agv.IsActive == IsActive.working
    })
    if (!finder) {
      // 从充电区找agv
      finder = this.agvList.find(agv => {
        return agv.AgvName != 'AGV01' && agv.IsActive == IsActive.charge && agv.RunStatus == RunStatus.stop
      })
      this.log(`RAGV(${finder.AgvName})调用PostAction,取(放)料架`)
      let param: IPostAction = {
        ActionID: this.currentTask.id,
        ActionType: 1,
        AGVName: finder.AgvName,
        UpOrDown: 1,
        IsRead: 1,
        ActionTime: moment().format("YYYY-MM-DD")
      }
      await this.taskReqSev.agvpostAction(param)
    }
    this.B_agv_active = finder;
    console.log(finder)
    
    let startPort = this.B_agv_active.Rfid;
    let endPort = targetFrame.stopAgv2;
    ////////////////执行移动命令/////////////////
    this.log(`RAGV(${this.B_agv_active.AgvName})调用posttask，由${startPort}移动到${endPort}`)
    await this.agvMove(this.B_agv_active.AgvName, startPort, endPort)
    await this.taskReqSev.updateAgvInfo({
      AgvName: this.B_agv_active.AgvName,
      RunStatus: RunStatus.move,
      IsActive: IsActive.working
    })
    let ragvB = this.listenAgvRfid(this.B_agv_active.AgvName, targetFrame.stopAgv2);
    let ragvA = this.listenAgvRfid(this.A_agv.AgvName, targetFrame.stopAgv1);
    await Promise.all([ragvA, ragvB])
    console.log(123123123)
    if (ragvA) {
      this.log(`BAGV(AGV01)已到达${endPort}`)
      await this.taskReqSev.updateAgvInfo({
        AgvName: this.A_agv.AgvName,
        RunStatus: RunStatus.stop,
      })
    }
    if (ragvB) {
      this.log(`RAGV(${this.B_agv_active.AgvName})已到达${endPort} `)
      await this.taskReqSev.updateAgvInfo({
        AgvName: this.B_agv_active.AgvName,
        RunStatus: RunStatus.stop
      })
      await this.upCatch(this.B_agv_active)
    }


    // this.B_agv_EventEmitter.subscribe(ele => {
    //   this.B_agv_active = ele[finderIndex];
    //   this.message.info(`B型agv行进到${ this.B_agv_active.Rfid } `)
    //   if (this.B_agv_active.Rfid == endPort) {
    //     this.log('B型agv已经到达目标点');
    //     this.log('B型agv开始上架');
    //     this.B_agv_EventEmitter.complete()
    //     ///////////////执行抓取命令//////////////
    //     this.agvCatching(this.B_agv_active.RackContent)
    //   }
    // });
  }

  async updateActive(AgvName: string, IsActive: number) {
    let res = await this.taskReqSev.updateAgvInfo({
      AgvName: AgvName,
      IsActive: IsActive
    })
  }

  async agvMove(agvName: string, startPort, endPort) {
    ///////////////调用agv移动接口///////////////
    let param: IPostTask = {
      AGVName: agvName,
      SourcePort: startPort,
      DestPort: endPort,
      TaskID: this.currentTask.id,
      TaskType: TaskType.working,
      IsRead: 1,
      TaskTime: moment().format("YYYY-MM-DD")
    }
    let res = await this.taskReqSev.agvpostTask(param)
    if (!res) {
      return;
    }
  }

  async upCatch(agv): Promise<any> {
    let array = [1, 2, 3];
    let RackContent = agv.RackContent;
    let res;
    this.log(`RAGV(${this.B_agv_active.AgvName})调用plc接口`)
    for (const item of array) {
      await this.wait2000sec()
      let param = {
        AgvName: agv.AgvName,
        RackContent: RackContent + 1
      }
      RackContent = RackContent + 1;
      res = await this.taskReqSev.updateAgvInfo(param);
      this.B_agv_active = res.data;
      this.log(`第${item}上料成功, 当前料架已有${RackContent} `)
      console.log(RackContent)
    }
    if (res.data.RackContent == 12) {
      this.log(`RAGV(${this.B_agv_active.AgvName})返回充电点`)
      await this.agvMove(this.B_agv_active.AgvName, this.B_agv_active.Rfid, this.BatteryRfid)
      await this.taskReqSev.updateAgvInfo({
        AgvName: this.B_agv_active.AgvName,
        RunStatus: RunStatus.move,
        IsActive: IsActive.charge
      })
    }

    this.currentTask.isFinished = 1;
    await this.taskReqSev.updateTask(this.currentTask);
    this.startTask();
    // let res2 = await this.listenAgvRfid(this.B_agv_active.AgvName, this.BatteryRfid);
    // if(res2) {
    //   await this.taskReqSev.updateAgvInfo({
    //     AgvName: this.B_agv_active.AgvName,
    //     RunStatus: RunStatus.stop,
    //     IsActive: IsActive.charge
    //   })
    // }
  }

  wait2000sec() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve()
      }, 2000);
    })
  }

  /**
   * 抓取成功
   * @param text 
   */
  // async postCatch(RackContentNumber): Promise<any> {

  //   if (RackContentNumber > 0) {
  //     let param = {
  //       AgvName: this.B_agv_active.AgvName,
  //       RackContent: RackContentNumber - 1
  //     }
  //     console.log(param)
  //     let res = await this.taskReqSev.updateAgvInfo(param);
  //     // console.log(res.data)
  //     let RackContent = res.data.RackContent;
  //     if (res.success) {
  //       this.message.success(`抓取成功, 当前料架剩余${RackContent} `)
  //     }
  //     setTimeout(() => {
  //       this.postCatch(RackContent)
  //     }, 2000);
  //   } else {
  //     this.log('B型agv返回充电');
  //     this.startTask()
  //   }
  // }

  log(text: string) {
    this.actionList.push(text)
    let that = this;
    setTimeout(() => {
      that.logEvent.next(text)
    }, 500);
    
  }

  // checkEndPort() {
  //   return this.fromEvent(document, 'keydown')
  //     .subscribe((e: KeyboardEvent) => {
  //       if (e.keyCode === 27) {
  //         // nameInput.value = '';
  //         console.log('esc is keydown')
  //         return e.keyCode
  //       }
  //     });
  // }

  fromEvent(target, eventName) {
    return new Observable((observer) => {
      console.log()
      if (target.RackNumBer != eventName) {
        observer.next(x => { console.log('Observer got a next value: ' + x) })
      } else {
        return target;
      }
    });
  }



}
