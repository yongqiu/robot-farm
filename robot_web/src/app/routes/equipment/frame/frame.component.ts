import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  dataSet: any = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        index: i + 1,
        type: '青菜',
        date: '2018-10-11',
        sljOpen: false,
        ggOpen: false,
        number: '123',
        status: '有菜',
        method: ''
      })
    }
  }

}
