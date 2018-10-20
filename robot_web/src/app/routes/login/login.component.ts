import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: string;
  username: string;
  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  routeTo() {
    console.log(123)
    this.router.navigate(["product"]);
  }

}
