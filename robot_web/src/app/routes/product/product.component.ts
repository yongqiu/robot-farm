import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { RequestService } from '../../service/request.service';
import { ITaskViewModel, VEGETABLES } from 'src/app/service/task/task.model';
import { TaskService } from 'src/app/service/task/task.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  dataSet = [];
  // i = 1;
  editCache = {};
  taskForm: ITaskViewModel = {};
  frameList: any = [];
  gutterList: any = [];
  vegetableList: Array<any> = [];
  createTaskView: boolean = false;
  actionList: any = [];
  // 模拟
  moveAction = {
    name: '',
    port: ''
  }
  constructor(private reqSev: RequestService, public taskSev: TaskService, public message: NzMessageService) {
    for (const key in VEGETABLES) {
      if (VEGETABLES.hasOwnProperty(key)) {
        const element = VEGETABLES[key];
        if (typeof element == 'number') {
          this.vegetableList.push({ value: element, text: VEGETABLES[element] })
        }
      }
    }
  }

  async analogMoveTask() {
    let res = await this.reqSev.queryServer({ url: '/api/GetLastMove', method: 'get' }, {});
    let data = res.data;
    this.message.info(`获取到移动任务：-${data.AGVName}-由-${data.SourcePort}-移动到-${data.DestPort}-`)
  }

  async analogMoveAction() {
    let param = {
      AgvName: this.moveAction.name,
      Rfid: this.moveAction.port,
    }
    let res = await this.reqSev.queryServer({ url: '/api/PostAllAgvInfo', method: 'post' }, param);
    if (!res) {
      this.message.error(`未找到agv：${this.moveAction.name}`)
    }
  }

  ngOnInit(): void {
    // for (let i = 0; i < 108; i++) {
    //   this.frameList.push(`zpj-${i + 1}`);
    // }

    for (let i = 0; i < 19; i++) {
      this.gutterList.push(`c-${i + 1}`)
    }
    // this.updateEditCache()
    this.getTaskList()
  }

  async create() {
    this.taskForm.direction = 1;
    let res = await this.reqSev.queryServer({ url: '/api/GetAllFRAME', method: 'get' }, {})
    if (res.success) {
      this.frameList = res.data
    } else {
      this.frameList = [];
    }
    console.log(this.frameList)
    this.createTaskView = true;
  }

  async submit() {
    console.log(this.taskForm)
    if (this.taskForm.id) {
      let res = await this.reqSev.queryServer({ url: '/api/UpdateTask', method: 'post' }, this.taskForm);
      if (res.success) {
        await this.getTaskList();
        this.createTaskView = false;
      }
      console.log(res)
    } else {
      let res = await this.reqSev.queryServer({ url: '/api/PostTask', method: 'post' }, this.taskForm);
      if (res.success) {
        await this.getTaskList();
        this.createTaskView = false;
      }
      console.log(res)
    }
  }

  async getTaskList() {
    let res = await this.reqSev.queryServer({ url: '/api/GetAllTask', method: 'get' }, {});
    if (res.success) {
      this.taskSev.taskList = [];
      res.data.forEach(element => {
        this.taskSev.taskList.push(element)
      });
      console.log(this.taskSev.taskList)
    }
  }

  editTask(item) {
    this.taskForm = item;
    this.createTaskView = true;
    console.log(this.taskForm)
  }

  startTask() {
    console.log(this.taskSev.taskList)

  }

}
