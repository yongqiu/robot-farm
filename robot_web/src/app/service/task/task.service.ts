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
  A_agv: any;
  selectB_agv: AgvModel;

  constructor(private taskReqSev: TaskRequestService) {
    for (let i = 0; i < 4; i++) {
      this.agvList.push(new AgvModel({
        AgvName: `agv${i + 1}`
      }))
    }
    this.initSocket()
    this.A_agv = new EventEmitter();
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

    this.A_agv.emit(this.A_agv)

  }

  async getInitAgv() {
    this.agvList.forEach(async (agv, index) => {
      let res = await this.taskReqSev.getAgvHistoryInfo(agv.AgvName)
      console.log(res)
      if (res) {
        this.agvList[index] = new AgvModel(res)
        this.agvList[index].startPort = res.Rfid;
        this.agvList[index].endPort = null;
      }
    })
    this.A_agv = this.agvList[0];
    console.log(this.agvList)
  }

  async startTask() {
    console.log(this.taskList)
    let firstUnfinishTaskIndex = this.taskList.findIndex(task => {
      return task.isFinished == false;
    })
    console.log(this.A_agv)
    this.A_agv.startPort = this.taskList[firstUnfinishTaskIndex].frameNumber;
    this.A_agv.endPort = this.taskList[firstUnfinishTaskIndex + 1].frameNumber;
    this.A_agv.subscribe(ele => {
      console.log(this.A_agv)
      if (this.A_agv.frameNumber == this.A_agv.endPort) {
        console.log('finish')
      }
    });

  }

  test() {
    const myObservable = of(this.A_agv);
    // Create observer object
    const myObserver = {
      next: x => { console.log('Observer got a next value: ' + x) },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    // Execute with the observer object
    myObservable.subscribe(myObserver);
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
