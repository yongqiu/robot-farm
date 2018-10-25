import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  roleList: any = [];
  constructor(private reqSev: RequestService) {

  }

  async getRoleList() {
    return await this.reqSev.queryServer({ url: '/api/robot/roleData', method: 'get' }, {})
  }

  async postRole(param){
    return await this.reqSev.queryServer({ url: '/api/robot/roleData', method: 'post' }, param)
  }
}
