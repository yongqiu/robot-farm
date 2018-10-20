import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-manage',
  templateUrl: './position-manage.component.html',
  styleUrls: ['./position-manage.component.scss']
})
export class PositionManageComponent implements OnInit {
  dataSet: any = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        positionNum: '单盘任务',
        frameNum: 'xxx001',
        point: 'x3-' + i,
        speed: '20 m/h',
        times: 5,
        method: ''
      })
    }
  }

}
