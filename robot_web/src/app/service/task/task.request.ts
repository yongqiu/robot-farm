import { Injectable } from "@angular/core";
import { RequestService } from "../request.service";
import { MoveActionModel } from "./task.model";

@Injectable()
export class TaskRequestService {
    constructor(private reqSev: RequestService) {

    }

    /**
     * 获取avgInfo
     * @param AgvName 
     */
    async getAgvHistoryInfo(AgvName: string) {
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
}