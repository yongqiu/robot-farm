import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame-manage',
  templateUrl: './frame-manage.component.html',
  styleUrls: ['./frame-manage.component.scss']
})
export class FrameManageComponent implements OnInit {
  dataSet: any = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        number: 'xxx00'+i,
        colVal: '22',
        colLow: '12',
        colHigh: '32',
        rowVal: '22',
        rowLow: '12',
        rowHigh: '32',
      })
    }
  }

  addFrame(){
    
  }

}
