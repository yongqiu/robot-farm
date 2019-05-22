import { Injectable } from "@angular/core";
import { RequestService } from "../request.service";
import { MoveActionModel, ITaskViewModel, AgvModel } from "./task.model";

@Injectable()
export class TaskRequestService {
    constructor(private reqSev: RequestService) {

    }

    /**
     * 获取avgInfo
     * @param AgvName 
     */
    async getAgvHistoryInfo(AgvName: string): Promise<AgvModel> {
        let res = await this.reqSev.queryServer({ url: '/api/getAgvbyName', method: 'get' }, { AgvName: AgvName })
        if (res.success) {
            return res.data
        } else {
            return null;
        }
    }

    /**
     * 执行agv移动
     * @param param 
     */
    async postAgvMoveAction(param: {
        AGVName: string,
        SourcePort: number,
        DestPort: number,
    }): Promise<boolean> {
        let res = await this.reqSev.queryServer({ url: '/api/PostMove', method: 'post' }, param);
        if (res.success) {
            return true;
        } else {
            return false;
        }
    }


    async updateAgvInfo(param) {
        let res = await this.reqSev.queryServer({ url: '/api/PostAllAgvInfo', method: 'post' }, param);
        return res;
    }

    /**
     * 新建任务
     * @param param 
     */
    async createTask(param: ITaskViewModel) {
        let res = await this.reqSev.queryServer({ url: '/api/PostTask', method: 'post' }, param);
        return res;
    }

    /**
     * 获取任务列表
     * @returns
     * @memberof TaskRequestService
     */
    async getTaskList() {
        let res = await this.reqSev.queryServer({ url: '/api/GetAllTask', method: 'get' }, {});
        return res;
    }

    /**
     * 更新task
     * @param {ITaskViewModel} param
     * @returns
     * @memberof TaskRequestService
     */
    async updateTask(param: ITaskViewModel) {
        let res = await this.reqSev.queryServer({ url: '/api/UpdateTask', method: 'post' }, param);
        return res;
    }

    async getFrameList() {
        let res = await this.reqSev.queryServer({ url: '/api/GetAllFRAME', method: 'get' }, {})
        return res;
    }
}