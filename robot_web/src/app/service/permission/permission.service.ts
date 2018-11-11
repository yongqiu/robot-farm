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
    return await this.reqSev.queryServer({ url: '/api/role/getList', method: 'get' }, {})
  }

  async createRole(param) {
    return await this.reqSev.queryServer({ url: '/api/role/create', method: 'post' }, param)
  }

  async updateRole(param) {
    return await this.reqSev.queryServer({ url: '/api/role/update', method: 'post' }, param)
  }

  async deleteRole(id) {
    return await this.reqSev.queryServer({ url: '/api/role/delete', method: 'delete' }, { id: id })
  }

  async createUser(param) {
    return await this.reqSev.queryServer({ url: '/api/user/create', method: 'post' }, param)
  }

  async updateUser(param) {
    return await this.reqSev.queryServer({ url: '/api/user/update', method: 'post' }, param)
  }

  async getUserList() {
    return await this.reqSev.queryServer({ url: '/api/user/getList', method: 'get' }, {})
  }

  async deleteUser(id) {
    return await this.reqSev.queryServer({ url: '/api/user/delete', method: 'delete' }, { id: id })
  }

  async getUserById(id) {
    return await this.reqSev.queryServer({ url: '/api/user/getbyId', method: 'get' }, { id: id })
  }

  async login(param) {
    return await this.reqSev.queryServer({ url: '/api/login', method: 'post' }, param)
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
