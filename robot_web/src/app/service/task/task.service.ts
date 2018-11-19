import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { SOCKET_URL } from 'src/app/config';
import { RequestService } from '../request.service';
import { AgvModel, TaskModel } from './task.model';
import { TaskRequestService } from './task.request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private socket: any;
  agvList: Array<AgvModel> = [];
  taskList: TaskModel[] = [];
  A_agv: AgvModel;
  selectB_agv: AgvModel;
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
      console.log(res)
      this.dealWithAgvInfo(res)
    })
    this.getInitAgv()

    console.log('init socket')
  }

  //更新agv info
  dealWithAgvInfo(res) {
    console.log(res)
    if (res.type != 1) {
      return;
    }
    let agvInfo = new AgvModel(res.data)
    console.log(agvInfo)
    let finder = this.agvList.findIndex(agv => {
      return agv.AgvName == agvInfo.AgvName
    })
    if (finder == -1) {
      this.agvList.push(agvInfo)
    } else {
      this.agvList[finder] = agvInfo;
    }
    this.A_agv = this.agvList[0];
  }

  async getInitAgv() {
    this.agvList.forEach(async (agv, index) => {
      let res = await this.taskReqSev.getAgvHistoryInfo(agv.AgvName)
      if (res) {
        this.agvList[index] = new AgvModel(res)
      }
    })
    console.log(this.agvList)
  }

  async startTask() {
    console.log(this.taskList)
    let firstUnfinishTaskIndex = this.taskList.findIndex(task => {
      return task.isFinished == false;
    })
    this.A_agv.startPort = this.taskList[firstUnfinishTaskIndex].frameNumber;
    this.A_agv.endPort = this.taskList[firstUnfinishTaskIndex + 1].frameNumber;
    await this.fromEvent(this.A_agv, this.A_agv.endPort).subscribe((e: AgvModel) => {
      if(e.RackNumBer == this.A_agv.endPort){
        return e.RackNumBer
      }
    });
    console.log('finish')
  }

  test(){
    this.A_agv.RackNumBer = 'zpj-5';
    console.log(this.A_agv)
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
      const handler = (e) => observer.next(e);

      // Add the event handler to the target
      target.addEventListener(eventName, handler);

      return () => {
        // Detach the event handler from the target
        target.removeEventListener(eventName, handler);
      };
    });
  }


}
