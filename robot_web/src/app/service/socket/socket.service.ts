import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { SOCKET_URL } from 'src/app/config';
import { RequestService } from '../permission/request.service';
export class AgvModel {
  id?: number;
  AgvName: string;
  RackNumBer: string;
  Rfid: number;
  Speed: number;
  Voltage: number;
  Status: number;
  RunStatus: number;
  BatteryNum: number;
  Alarm: number;
  RunTimes: number;
  constructor(param?) {
    this.AgvName = param.AgvName;
    this.RackNumBer = param.RackNumBer;
    this.Rfid = param.Rfid;
    this.Speed = param.Speed;
    this.Voltage = param.Voltage;
    this.Status = param.Status;
    this.RunStatus = param.RunStatus;
    this.BatteryNum = param.BatteryNum;
    this.Alarm = param.Alarm;
    this.RunTimes = param.RunTimes;
  }
}
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  agvList: Array<AgvModel> = [];
  constructor(private reqSev: RequestService) {
    for (let i = 0; i < 4; i++) {
      this.agvList.push(new AgvModel({
        AgvName: `agv${i + 1}`
      }))
    }
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
  }

  async getInitAgv() {
    this.agvList.forEach(async (agv, index) => {
      let res = await this.reqSev.queryServer({ url: '/api/getAgvbyName', method: 'get' }, { AgvName: agv.AgvName })
      if (res.data) {
        this.agvList[index] = new AgvModel(res.data)
      }
    })
    console.log(this.agvList)

  }


}
