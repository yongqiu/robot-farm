import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { RequestService } from '../../service/request.service';
import { ITaskViewModel, VEGETABLES } from 'src/app/service/task/task.model';
import { TaskService } from 'src/app/service/task/task.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { TaskRequestService } from 'src/app/service/task/task.request';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('consoleList') private myScrollContainer: ElementRef;
  agvList = ['AGV01', 'AGV02', 'AGV03', 'AGV04']
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
    name: null,
    port: ''
  }

  taskList: ITaskViewModel[] = [];
  public vege = VEGETABLES;
  constructor(private taskReqServ: TaskRequestService, public taskSev: TaskService, public message: NzMessageService) {
    for (const key in VEGETABLES) {
      if (VEGETABLES.hasOwnProperty(key)) {
        const element = VEGETABLES[key];
        if (typeof element == 'number') {
          this.vegetableList.push({ value: element, text: VEGETABLES[element] })
        }
      }
    }

    this.taskSev.logEvent.subscribe(text => {
      this.scrollToBottom()
    })
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.clientHeight + 25;
    } catch (err) { }
  }



  // async analogMoveTask() {
  //   let res = await this.reqSev.queryServer({ url: '/api/GetLastMove', method: 'get' }, {});
  //   let data = res.data;
  //   this.message.info(`获取到移动任务：-${data.AGVName}-由-${data.SourcePort}-移动到-${data.DestPort}-`)
  // }

  async analogMoveAction() {
    let param = {
      AgvName: this.moveAction.name,
      Rfid: this.moveAction.port,
    }
    let res = await this.taskReqServ.updateAgvInfo(param);
    if (!res) {
      this.message.error(`未找到agv：${this.moveAction.name}`)
    }
  }

  ngOnInit(): void {
    for (let i = 0; i < 19; i++) {
      this.gutterList.push(`c-${i + 1}`)
    }
    this.getFrameList();
    this.getTaskList();
  }

  async getFrameList() {
    let res = await this.taskReqServ.getFrameList();
    if (res.success) {
      this.frameList = res.data
    } else {
      this.frameList = [];
    }
  }

  async create() {
    this.taskForm = {}
    this.taskForm.direction = 1;
    this.taskForm.plateType = 1;
    this.createTaskView = true;
  }

  async submit() {
    console.log(this.taskForm)
    if (this.taskForm.id) {
      let res = await this.taskReqServ.updateTask(this.taskForm);
      if (res.success) {
        await this.getTaskList();
        this.createTaskView = false;
      }
    } else {
      let res = await this.taskReqServ.createTask(this.taskForm);
      if (res.success) {
        await this.getTaskList();
        this.createTaskView = false;
      }
    }
  }

  async getTaskList() {
    let res = await this.taskReqServ.getTaskList();
    if (res.success) {
      this.taskList = [];
      res.data.forEach(element => {
        this.taskList.push(element)
      });
      console.log(this.taskList)
      this.taskSev.taskList = this.taskList;
    }
  }

  editTask(item) {
    console.log(item)
    this.taskForm = JSON.parse(JSON.stringify(item));
    this.taskForm.plateType = 1;
    this.createTaskView = true;
  }

  async deleteTask(data) {
    let res = await this.taskReqServ.deleteTask(data.id)
    if (res.success) {
      this.message.success('删除成功')
      this.getTaskList();
    }
  }

  startTask() {
    this.taskSev.taskList = this.taskList;
    this.taskSev.startTask()

  }

}
