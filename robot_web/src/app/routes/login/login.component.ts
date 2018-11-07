import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../service/request.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: string = '';
  username: string = '';
  constructor(private router: Router, private reqSev: RequestService, private message: NzMessageService) {
  }

  ngOnInit(): void {

  }

  routeTo() {
    console.log(123)
    this.router.navigate(["product"]);
  }

  async login() {
    if(this.username==''){
      this.message.error('用户名不能为空')
      return;
    }
    if(this.password==''){
      this.message.error('密码不能为空')
      return;
    }
    let param = {
      userName: this.username,
      password: this.password
    }
    let res = await this.reqSev.queryServer({ url: '/api/robot/login', method: 'post' }, param)
    console.log(res)
    if (res.code == 200) {
      localStorage.setItem('roleInfo', res.msg.roleInfo)
      this.router.navigate(["product"]);
    } else {
      this.message.error(res.msg)
    }
  }

}
