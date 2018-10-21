import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../service/permission.service';
import { AuthorConfig } from '../../config';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {
  dataSet: any = [];
  roleModalView: boolean = false;
  pointList: any[] = [];
  permission: any = {};
  rolename: string;
  keyConfig: any;
  constructor(private permisServ: PermissionService) {

  }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        username: 'Tom',
        nickname: 'xxx001',
        role: 'x3-' + i,
      })
    }
    for (let i = 0; i < 20; i++) {
      this.pointList.push({
        key: i.toString(),
        title: `content${i + 1}`,
        isSelected: false
      });
    }

    for (const key in AuthorConfig) {
      console.log(AuthorConfig[key])
      this.permission[`${AuthorConfig[key]}`] = false;
    }

    console.log(this.permission)

  }

  async submitCreate() {
    console.log(this.permission)
    let newArray = []
    for (const key in this.permission) {
      if (this.permission[key]) {
        newArray.push(key)
      }
    }
    console.log(newArray)
    if (!this.rolename) {
      return;
    }
    let param = {
      roleName: this.rolename,
      roleInfo: JSON.stringify(newArray)
    }
    let res = await this.permisServ.postRole(param)
    console.log(res)
  }

  async showRoles(){
    let res = await this.permisServ.getRoleList()
    console.log(res)
    this.roleModalView = true;
  }

  async postRole(){
    
  }


  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

}
