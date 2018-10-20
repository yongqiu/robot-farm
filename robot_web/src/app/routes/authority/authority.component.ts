import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {
  dataSet: any = [];
  roleModalView: boolean = false;
  pointList: any[] = [];
  constructor() { }

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


  }
  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

}
