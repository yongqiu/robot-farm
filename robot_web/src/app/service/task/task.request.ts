import { Injectable } from "@angular/core";
import { RequestService } from "../request.service";
import { MoveActionModel, ITaskViewModel, AgvModel } from "./task.model";
import { AGV_URL } from "src/app/config";

export interface IPostTask {
    TaskID: number,
    TaskType: number,
    AGVName: string,
    SourcePort: string,
    DestPort: string,
    IsRead: number,
    TaskTime: string
}

export interface IPostAction {
    ActionID: number,
    ActionType: number,
    AGVName: string,
    UpOrDown: number,
    IsRead: number,
    ActionTime: string
}

interface IAgvInfo {
    AgvName: string,
    RackNumBer: string,
    Rfid: number,
    Speed: number,
    Voltage: number,
    Status: number,
    RunStatus: number,
    BatteryNum: number,
    Alarm: string,
    RunTimes: number,
    IsOnline: number
}

@Injectable()
export class TaskRequestService {
    constructor(private reqSev: RequestService) {

    }

    /**
     * 获取avgInfo
     * @param AgvName 
     */
    async getAgvByName(AgvName: string): Promise<AgvModel> {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/getAgvbyName', method: 'get' }, { AgvName: AgvName })
        if (res.success) {
            return res.data
        } else {
            return null;
        }
    }

    async changeAgvName(id: number, name: string) {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/changeName', method: 'post' }, { id: id, name: name })
        return res;
    }

    async getAllAgvs() {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/getAllAgvInfo', method: 'get' }, {})
        return res;
    }


    async updateAgvInfo(param) {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/PostAllAgvInfo', method: 'post' }, param);
        return res;
    }

    /**
     * 新建任务
     * @param param 
     */
    async createTask(param: ITaskViewModel) {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/CreateTask', method: 'post' }, param);
        return res;
    }

    async deleteTask(id: string) {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/DeleteTask', method: 'delete' }, { id: id });
        return res;
    }

    /**
     * 获取任务列表
     * @returns
     * @memberof TaskRequestService
     */
    async getTaskList() {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/GetAllTask', method: 'get' }, {});
        return res;
    }

    /**
     * 更新task
     * @param {ITaskViewModel} param
     * @returns
     * @memberof TaskRequestService
     */
    async updateTask(param: ITaskViewModel) {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/UpdateTask', method: 'post' }, param);
        return res;
    }

    /**
     * getFrameList
     * @returns
     * @memberof TaskRequestService
     */
    async getFrameList() {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/GetAllFRAME', method: 'get' }, {})
        return res;
    }

    async agvpostTask(postTask: IPostTask) {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/PostTask', method: 'post' }, postTask)
        return res;
    }

    async agvpostAction(postAction: IPostAction) {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/PostAction', method: 'post' }, postAction)
        return res;
    }

    async getAllAgvInfo(): Promise<Array<IAgvInfo>> {
        let res = await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/getAllAgvInfo', method: 'get' }, {})
        return res;
    }
}