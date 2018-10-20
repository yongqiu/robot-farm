import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {
  dataSet: any = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        quantity: '20%',
        warning: false,
        speed: '20 m/h',
        status: '正在执行',
      })

    }
  }

}
