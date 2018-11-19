import { Injectable } from "@angular/core";
import { RequestService } from "../request.service";

@Injectable()
export class TaskRequestService {
    constructor(private reqSev: RequestService) {

    }

    async getAgvHistoryInfo(AgvName: string) {
        let res = await this.reqSev.queryServer({ url: '/api/getAgvbyName', method: 'get' }, { AgvName: AgvName })
        if (res.success) {
            return res.data
        } else {
            return null;
        }
    }
}