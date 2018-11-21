import { Injectable, EventEmitter } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { SOCKET_URL } from 'src/app/config';
import { RequestService } from '../request.service';
import { AgvModel, TaskModel } from './task.model';
import { TaskRequestService } from './task.request';
import { Observable, of, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private socket: any;
  agvList: Array<AgvModel> = [];
  taskList: TaskModel[] = [];
  A_agv: AgvModel;
  B_agv_active: AgvModel;
  selectB_agv: AgvModel;

  A_agv_EventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private taskReqSev: TaskRequestService) {
    for (let i = 0; i < 4; i++) {
      this.agvList.push(new AgvModel({
        AgvName: `agv${i + 1}`
      }))
    }
    this.initSocket()
  }

  initSocket(): void {
    this.socket = socketIo(SOCKET_URL);
    // console.log(this.socket)
    // 监听agv变化
    this.socket.on('getAgvInfo', (res) => {
      this.dealWithAgvInfo(res)
    })
    this.getInitAgv()

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
    this.A_agv = this.agvList[0];
    this.A_agv_EventEmitter.emit(this.A_agv)

  }

  /**
   * 获取agv历史数据
   */
  async getInitAgv() {
    this.agvList.forEach(async (agv, index) => {
      let res = await this.taskReqSev.getAgvHistoryInfo(agv.AgvName)
      if (res) {
        this.agvList[index] = new AgvModel(res)
      }
    })
    this.A_agv = this.agvList[0];
  }

  /**
   * 开始任务
   */
  async startTask() {
    let firstUnfinishTaskIndex = this.taskList.findIndex(task => {
      return task.isFinished == false;
    })
    console.log('开始第一条任务')
    let startPort = this.taskList[firstUnfinishTaskIndex].frameNumber;
    let endPort = this.taskList[firstUnfinishTaskIndex + 1].frameNumber;
    this.A_agv_EventEmitter.subscribe(ele => {
      if (this.A_agv.RackNumBer == endPort) {
        console.log('A型 agv已经到达目标点')
      }
    });
  }

  findenableB_agv(){
    
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
