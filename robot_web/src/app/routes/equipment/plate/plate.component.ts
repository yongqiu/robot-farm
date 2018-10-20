import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss']
})
export class PlateComponent implements OnInit {
  dataSet: any = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        quantity: '20%',
        AVGwarning: false,
        Robotwarning: false,
        speed: '20 m/h',
        times: 5,
        method: ''
      })
    }
  }
}
