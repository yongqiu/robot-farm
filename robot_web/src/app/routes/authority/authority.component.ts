import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../service/permission.service';
import { AuthorConfig } from '../../config';
import { RequestService } from '../../service/request.service';
import { NzMessageService } from 'ng-zorro-antd';

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
    let res = await this.reqSev.queryServer({ url: '/api/robot/roleData', method: 'get' }, {})
    console.log(res)
    this.roleList = []
    res.msg.forEach(element => {
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
      id: null
    }
    if (this.roleData.id) {
      param.id = this.roleData.id
    }
    let res = await this.permisServ.postRole(param)
    if (res.code == 200) {
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
    let res = await this.reqSev.queryServer({ url: '/api/robot/roleData', method: 'delete' }, { id: id })
    if (res.code == 200) {
      this.message.success('删除成功')
      this.getRoleList()
    }
  }

  async editRole(role) {
    let res = await this.reqSev.queryServer({ url: '/api/robot/roleData', method: 'get' }, { id: role.id })
    let points = JSON.parse(res.msg[0].roleInfo)
    points.forEach(element => {
      let index = this.roleData.permission.findIndex(e => {
        return e.key == element
      })
      this.roleData.permission[index].val = true;
    });
    this.roleData.roleName = role.roleName;
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
    let param = {
      userName: this.userData.userName,
      password: this.userData.password,
      roleId: this.userData.roleId,
      id: this.userData.id? this.userData.id: null
    }
    let res = await this.reqSev.queryServer({ url: '/api/robot/userData', method: 'post' }, param)
    console.log(param)
    if (res.code == 200) {
      this.message.success('提交成功')
      this.getUserList()
      this.userModalView = false;
    }
  }

  async getUserList() {
    let res = await this.reqSev.queryServer({ url: '/api/robot/userData', method: 'get' }, {})
    console.log(res)
    this.userList = []
    res.msg.forEach(element => {
      this.userList.push({
        userName: element.userName,
        password: element.password,
        roleName: element.roleName,
        id: element.id,
        createdAt: element.createdAt
      })
    });
    console.log(this.userList)
  }

  async deleteUser(id) {
    let res = await this.reqSev.queryServer({ url: '/api/robot/userData', method: 'delete' }, { id: id })
    if (res.code == 200) {
      this.message.success('删除成功')
      this.getUserList()
    }
  }

  async editUser(user) {
    console.log(user)
    let res = await this.reqSev.queryServer({ url: '/api/robot/userData', method: 'get' }, { id: user.id })
    let data = res.msg[0]
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
