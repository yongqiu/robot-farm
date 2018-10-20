import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params:Params)=>{
      console.log(params)
    });
  }


  ngOnInit() {
  }
  routeTo(url?: string) {
    if (url) {
      this.router.navigate([url]);
    } else {
      // this.message.warning('该功能暂未开放')
    }
  }
}
