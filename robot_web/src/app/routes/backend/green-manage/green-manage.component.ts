import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-green-manage',
  templateUrl: './green-manage.component.html',
  styleUrls: ['./green-manage.component.scss']
})
export class GreenManageComponent implements OnInit {
  dataSet: any = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        type: '单盘任务',
        name: '青菜',
        cycle: 6
      })
    }
  }

}
