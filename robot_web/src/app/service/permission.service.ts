import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Router } from '@angular/router';

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

  async postRole(param) {
    return await this.reqSev.queryServer({ url: '/api/robot/roleData', method: 'post' }, param)
  }

  canMenu(key) {
    let points = JSON.parse(localStorage.getItem('roleInfo'))
    if (points && points.indexOf(key.toString()) == -1) {
      return false;
    } else {
      return true
    }
  }
}
