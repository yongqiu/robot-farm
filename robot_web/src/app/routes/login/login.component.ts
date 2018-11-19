import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../service/request.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PermissionService } from '../../service/permission/permission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: string = '';
  username: string = '';
  constructor(private permisServ: PermissionService, private router: Router, private reqSev: RequestService, private message: NzMessageService) {
  }

  ngOnInit(): void {

  }

  routeTo() {
    console.log(123)
    this.router.navigate(["product"]);
  }

  async login() {
    if (this.username == '') {
      this.message.error('用户名不能为空')
      return;
    }
    if (this.password == '') {
      this.message.error('密码不能为空')
      return;
    }
    let param = {
      userName: this.username,
      password: this.password
    }
    let res = await this.permisServ.login(param)
    console.log(res)
    if (res.success) {
      localStorage.setItem('roleInfo', res.data.r_role.roleInfo)
      this.router.navigate(["product"]);
    } else {
      this.message.error(res.message)
    }
  }

}
