import { isNullOrUndefined } from "util";

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
  startPort: string;
  endPort: string;
  constructor(param?) {
    (!isNullOrUndefined(param.AgvName)) && (this.AgvName = param.AgvName);
    (!isNullOrUndefined(param.RackNumBer)) && (this.RackNumBer = param.RackNumBer);
    (!isNullOrUndefined(param.Rfid)) && (this.Rfid = param.Rfid);
    (!isNullOrUndefined(param.Speed)) && (this.Speed = param.Speed);
    (!isNullOrUndefined(param.Voltage)) && (this.Voltage = param.Voltage);
    (!isNullOrUndefined(param.Status)) && (this.Status = param.Status);
    (!isNullOrUndefined(param.RunStatus)) && (this.RunStatus = param.RunStatus);
    (!isNullOrUndefined(param.BatteryNum)) && (this.BatteryNum = param.BatteryNum);
    (!isNullOrUndefined(param.Alarm)) && (this.Alarm = param.Alarm);
    (!isNullOrUndefined(param.RunTimes)) && (this.RunTimes = param.RunTimes);
    (!isNullOrUndefined(param.startPort)) && (this.startPort = param.startPort);
    (!isNullOrUndefined(param.endPort)) && (this.endPort = param.endPort);
  }
}
export class TaskModel {
  id: number;
  type: number;
  frameNumber: string;
  gutterNumber: string;
  vegetable: string;
  direction: number;
  createdAt: number;
  updateAt: number;
  isFinished: boolean = false;
  r_frame: any
  constructor(param) {
    (!isNullOrUndefined(param.id)) && (this.id = param.id);
    (!isNullOrUndefined(param.type)) && (this.type = param.type);
    (!isNullOrUndefined(param.frameNumber)) && (this.frameNumber = param.frameNumber);
    (!isNullOrUndefined(param.gutterNumber)) && (this.gutterNumber = param.gutterNumber);
    (!isNullOrUndefined(param.vegetable)) && (this.vegetable = param.vegetable);
    (!isNullOrUndefined(param.direction)) && (this.direction = param.direction);
    (!isNullOrUndefined(param.createdAt)) && (this.createdAt = param.createdAt);
    (!isNullOrUndefined(param.updateAt)) && (this.updateAt = param.updateAt);
    (!isNullOrUndefined(param.isFinished)) && (this.isFinished = param.isFinished);
    (!isNullOrUndefined(param.r_frame)) && (this.r_frame = param.r_frame);
  }
}