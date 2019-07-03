import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../service/permission/permission.service';
import { AuthorConfig } from '../../config';
import { RequestService } from '../../service/request.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {
  roleList: any = [];
  userList: any = [];
  roleModalView: boolean = false;
  roleData: any = {
    roleName: null,
    permission: [],
    id: null
  };
  userModalView: boolean = false;
  userData: any;
  selectedRole: null;
  pointList: any[] = [];
  // permission: any = {};
  // rolename: string;
  keyConfig: any;
  constructor(private permisServ: PermissionService, private reqSev: RequestService, private message: NzMessageService) {

  }

  ngOnInit() {

    this.initRole()


    // console.log(this.roleData.permission)

    this.getRoleList()
    this.getUserList()
  }

  initRole() {
    this.roleData = {
      roleName: null,
      permission: [],
      id: null
    }
    for (const key in AuthorConfig) {
      this.roleData.permission.push({
        key: key,
        val: false,
        name: AuthorConfig[key]
      });
    }

  }
  async getRoleList() {
    let res = await this.permisServ.getRoleList();
    console.log(res)
    this.roleList = []
    res.data.forEach(element => {
      let roles = [];
      JSON.parse(element.roleInfo).forEach(point => {
        roles.push(AuthorConfig[point])
      });
      this.roleList.push({
        roleName: element.roleName,
        points: roles.join(','),
        createdAt: element.createdAt,
        id: element.id
      })
    });
    console.log(this.roleList)
  }

  async submitRole() {
    console.log(this.roleData.permission)
    let newArray = []
    this.roleData.permission.forEach(element => {
      if (element.val) {
        newArray.push(element.key)
      }
    });
    console.log(newArray)
    if (!this.roleData.roleName) {
      this.message.error('角色名不能为空')
      return;
    }
    let param = {
      roleName: this.roleData.roleName,
      roleInfo: JSON.stringify(newArray),
    }
    let res;
    if (this.roleData.id) {
      param['id'] = this.roleData.id;
      res = await this.permisServ.updateRole(param);
    } else {
      res = await this.permisServ.createRole(param);
    }
    if (res.success) {
      this.message.success('提交成功')
      this.getRoleList()
      this.roleModalView = false;
    }
  }



  async createRoles() {
    this.initRole()
    this.roleModalView = true;
  }

  async deleteRole(id) {
    let res = await this.permisServ.deleteRole(id)
    if (res.success) {
      this.message.success('删除成功')
      this.getRoleList()
    }
  }

  async editRole(role) {
    let res = await this.reqSev.queryServer({ url: '/api/roleData', method: 'get' }, { id: role.id })
    let points = JSON.parse(res.msg[0].roleInfo)
    points.forEach(element => {
      let index = this.roleData.permission.findIndex(e => {
        return e.key == element
      })
      this.roleData.permission[index].val = true;
    });
    this.roleData.roleName = role.roleName;
    this.roleData.id = role.id;
    this.roleModalView = true;
  }


  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

  createUser() {
    this.userData = {
      userName: '',
      roleId: null,
      password: ''
    }
    this.userModalView = true;
    console.log(this.roleList)
  }

  async submitUser() {
    console.log(this.userData)
    let param = new Object({
      userName: this.userData.userName,
      password: this.userData.password,
      roleId: this.userData.roleId
    })
    if (this.userData.id) {
      param['id'] = this.userData.id
    }
    let res = await this.permisServ.createUser(param)
    console.log(param)
    if (res.success) {
      this.message.success('提交成功')
      this.getUserList()
      this.userModalView = false;
    }
  }

  async getUserList() {
    let res = await this.permisServ.getUserList();
    console.log(res)
    this.userList = []
    res.data.forEach(element => {
      this.userList.push({
        userName: element.userName,
        password: element.password,
        roleName: element.r_role.roleName,
        id: element.id,
        createdAt: moment.unix(element.createdAt).format("YYYY-MM-DD")
      })
    });
    console.log(this.userList)
  }

  async deleteUser(id) {
    let res = await this.permisServ.deleteUser(id);
    if (res.success) {
      this.message.success('删除成功')
      this.getUserList()
    }
  }

  async editUser(user) {
    console.log(user)
    let res = await this.permisServ.getUserById(user.id)
    let data = res.data;
    console.log(data)
    this.userData = {
      userName: data.userName,
      password: data.password,
      roleId: Number(data.role),
      id: data.id
    }
    console.log(this.userData)
    this.userModalView = true;
  }



}
