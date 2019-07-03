import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { AGV_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  roleList: any = [];
  constructor(private reqSev: RequestService) {

  }

  async getRoleList() {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/role/getList', method: 'get' }, {})
  }

  async createRole(param) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/role/create', method: 'post' }, param)
  }

  async updateRole(param) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/role/update', method: 'post' }, param)
  }

  async deleteRole(id) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/role/delete', method: 'delete' }, { id: id })
  }

  async createUser(param) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/user/create', method: 'post' }, param)
  }

  async updateUser(param) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/user/update', method: 'post' }, param)
  }

  async getUserList() {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/user/getList', method: 'get' }, {})
  }

  async deleteUser(id) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/user/delete', method: 'delete' }, { id: id })
  }

  async getUserById(id) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/user/getbyId', method: 'get' }, { id: id })
  }

  async login(param) {
    return await this.reqSev.queryServer({ url: AGV_URL + '/api/robot/login', method: 'post' }, param)
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
