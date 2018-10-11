import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avg',
  templateUrl: './avg.component.html',
  styleUrls: ['./avg.component.scss']
})
export class AvgComponent implements OnInit {
  dataSet: any = [];
  // robotStatus: any = ['已执行', '正在执行', '待执行'];
  // plateStatus: any = ['状态包含电量', 'AGV报警', '机器人报警', '运动速度', '充电次数'];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        quantity: '20%',
        warning: false,
        speed: '20 m/h',
        times: 5,
        method: ''
      })

    }
  }

}
