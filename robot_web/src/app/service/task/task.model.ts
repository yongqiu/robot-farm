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
  RackContent: number;
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
    (!isNullOrUndefined(param.RackContent)) && (this.RackContent = param.RackContent);
  }
}
export interface ITaskViewModel {
  id?: number;
  type?: number;
  frameNumber?: string;
  gutterNumber?: string;
  vegetable?: string;
  direction?: 1 | 2;
  createdAt?: number;
  updateAt?: number;
  isFinished?: boolean;
  r_frame?: any;
  [name: string]: any;
}

export class MoveActionModel {
  TaskID: number;
  TaskType: number;
  AGVName: string;
  SourcePort: string;
  DestPort: string;
  createdAt: number;
  constructor(param) {
    (!isNullOrUndefined(param.TaskID)) && (this.TaskID = param.TaskID);
    (!isNullOrUndefined(param.TaskType)) && (this.TaskType = param.TaskType);
    (!isNullOrUndefined(param.AGVName)) && (this.AGVName = param.AGVName);
    (!isNullOrUndefined(param.SourcePort)) && (this.SourcePort = param.SourcePort);
    (!isNullOrUndefined(param.DestPort)) && (this.DestPort = param.DestPort);
    (!isNullOrUndefined(param.createdAt)) && (this.createdAt = param.createdAt);
  }
}

export interface ITask {
  // 任务id
  TaskID: number;
  // 任务类型 1：工作；2：充电
  TaskType: 1 | 2;
  // AGV名字
  AGVName: string;
  // 开始位置
  SourcePort: string;
  // 目标位置
  DestPort: string;
  // 是否已经读取 0:未读取；1：已读取
  IsRead: 0 | 1;
  // 任务执行时间
  TaskTime: Date
}

export enum VEGETABLES {
  '土豆',
  '青菜',
  '豆芽'
}