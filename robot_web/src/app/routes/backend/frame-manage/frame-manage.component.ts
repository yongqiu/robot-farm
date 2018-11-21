import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-frame-manage',
  templateUrl: './frame-manage.component.html',
  styleUrls: ['./frame-manage.component.scss']
})
export class FrameManageComponent implements OnInit {
  dataSet: any = [];
  constructor(private reqServ: RequestService) { }

  ngOnInit() {
    // for (let i = 0; i < 100; i++) {
    //   this.dataSet.push({
    //     index: i + 1,
    //     number: 'xxx00' + i,
    //     colVal: '22',
    //     colLow: '12',
    //     colHigh: '32',
    //     rowVal: '22',
    //     rowLow: '12',
    //     rowHigh: '32',
    //   })
    // }
    this.getFrameList()
  }

  async getFrameList() {
    let res = await this.reqServ.queryServer({ url: '/api/GetAllFRAME', method: 'get' }, {})
    console.log(res)
    this.dataSet = res.data;
  }

  async addFrame() {
    // for (let i = 1; i < 11; i++) {
    //   for (let j = 1; j < 11; j++) {
    //     let param = {
    //       colNumber: i,
    //       colLow: i,
    //       colHigh: i,
    //       rowNumber: j,
    //       rowLow: j,
    //       rowHigh: j,
    //       stopAgv1: Number(`${i}${j}01`),
    //       stopAgv2: Number(`${i}${j}02`),
    //       stopWait: Number(`${i}03`),
    //       createdAt: 1542784328
    //     }
    //     let res = await this.reqServ.queryServer({ url: '/api/PostFRAME', method: 'post' }, param)
    //     console.log(res)
    //   }

    // }



  }

}
