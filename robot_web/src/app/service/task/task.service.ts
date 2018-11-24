import { Injectable, EventEmitter } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { SOCKET_URL } from 'src/app/config';
import { RequestService } from '../request.service';
import { AgvModel, TaskModel } from './task.model';
import { TaskRequestService } from './task.request';
import { Observable, of, observable } from 'rxjs';
import { agvConfig } from './task.config';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private socket: any;
  agvList: Array<AgvModel> = [];
  taskList: TaskModel[] = [];
  actionList: string[] = [];
  A_agv: AgvModel;
  B_agv_active: AgvModel;
  selectB_agv: AgvModel;

  A_agv_EventEmitter: EventEmitter<any> = new EventEmitter();
  B_agv_EventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private taskReqSev: TaskRequestService, private message: NzMessageService) {
    for (let i = 0; i < 4; i++) {
      this.agvList.push(new AgvModel({
        AgvName: `AGV0${i + 1}`
      }))
    }
    this.getInitAgv()
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

  /**
   * 获取agv历史数据
   */
  async getInitAgv() {
    this.agvList.forEach(async (agv, index) => {
      let res = await this.taskReqSev.getAgvHistoryInfo(agv.AgvName)
      if (res) {
        this.agvList[index] = new AgvModel(res);
      }
    })
    console.log(this.agvList)
  }

  /**
   * 开始任务
   */
  async startTask() {
    let firstUnfinishTaskIndex = this.taskList.findIndex(task => {
      return task.isFinished == false;
    })
    let targetFrame = this.taskList[firstUnfinishTaskIndex + 1].r_frame;
    this.A_agv = this.agvList[0];
    let startPort = this.A_agv.Rfid;
    let endPort = targetFrame.stopAgv1;
    ////////////////执行移动命令/////////////////
    let param = {
      AGVName: this.A_agv.AgvName,
      SourcePort: startPort,
      DestPort: endPort
    }
    let res = await this.taskReqSev.postAgvMoveAction(param)
    if (!res) {
      return;
    }
    //////////////////监听agv位置///////////////
    this.log(`A型agv由${startPort}移动到${endPort}`)
    this.A_agv_EventEmitter.subscribe(ele => {
      this.A_agv = ele[0]
      this.message.info(`A型agv行进到${this.A_agv.Rfid}`)
      if (this.A_agv.Rfid == endPort) {
        this.log('A型agv已经到达目标点')
        this.A_agv_EventEmitter.complete()
        this.findenableB_agv(targetFrame);
      }
    });
  }


  /**
   * B型agv运动
   * @param targetFrame 
   */
  findenableB_agv(targetFrame) {
    let finderIndex = this.agvList.findIndex(agv => {
      return agv.AgvName != 'AGV01' && (agv.BatteryNum > agvConfig.lowBatteryNum) && agv.RackNumBer != null
    })
    console.log(finderIndex)
    this.B_agv_active = this.agvList[finderIndex];
    let startPort = this.B_agv_active.Rfid;
    let endPort = targetFrame.stopAgv2;
    this.log(`B型agv由${startPort}移动到${endPort}`)
    ////////////////执行移动命令/////////////////
    this.B_agv_EventEmitter.subscribe(ele => {
      this.B_agv_active = ele[finderIndex];
      this.message.info(`B型agv行进到${this.B_agv_active.Rfid}`)
      if (this.B_agv_active.Rfid == endPort) {
        this.log('B型agv已经到达目标点');
        ///////////////执行抓取命令//////////////
        this.postCatch()
      }
    });
  }

  /**
   * 抓取成功
   * @param text 
   */
  async postCatch() {
    let param = {
      AgvName: this.B_agv_active.AgvName,
      RackContent: this.B_agv_active.RackContent - 1
    }
    let res = await this.taskReqSev.updateAgvInfo(param);
    // console.log(res.data)
    if (res.success) {
      this.message.success('抓取成功')
    }
    let RackContent = res.data.RackContent;
    if (RackContent > 0) {
      this.postCatch()
    } else {
      ///////////执行回去动作/////////////
    }
  }

  log(text: string) {
    this.actionList.push(text)
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
