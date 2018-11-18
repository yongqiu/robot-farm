import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { RequestService } from '../../service/permission/request.service';

export class TaskModel {
  id: number;
  type: number;
  frameNumber: string;
  gutterNumber: string;
  vegetable: string;
  direction: number;
  createdAt: number;
  updateAt: number;
  constructor(param) {
    (!isNullOrUndefined(param.id)) && (this.id = param.id);
    (!isNullOrUndefined(param.type)) && (this.type = param.type);
    (!isNullOrUndefined(param.frameNumber)) && (this.frameNumber = param.frameNumber);
    (!isNullOrUndefined(param.gutterNumber)) && (this.gutterNumber = param.gutterNumber);
    (!isNullOrUndefined(param.vegetable)) && (this.vegetable = param.vegetable);
    (!isNullOrUndefined(param.direction)) && (this.direction = param.direction);
    (!isNullOrUndefined(param.createdAt)) && (this.createdAt = param.createdAt);
    (!isNullOrUndefined(param.updateAt)) && (this.updateAt = param.updateAt);
  }
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  i = 1;
  editCache = {};
  taskList: TaskModel[] = [];
  taskForm: TaskModel;
  frameList: any = [];
  gutterList: any = [];
  vegetableList: Array<string> = ['青菜', '土豆', '玉米'];
  createTaskView: boolean = false;
  constructor(private reqSev: RequestService) {

  }

  ngOnInit(): void {
    for (let i = 0; i < 108; i++) {
      this.frameList.push(`zpj-${i + 1}`);
    }

    for (let i = 0; i < 19; i++) {
      this.gutterList.push(`c-${i + 1}`)
    }
    // this.updateEditCache()
    this.getTaskList()
  }

  create() {
    this.createTaskView = true;
    this.taskForm = new TaskModel({
      type: 1,
      frameNumber: 'zpj-1',
      gutterNumber: 'c-1',
      vegetable: '青菜',
      direction: 1
    })
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
    }else{
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
      this.taskList = [];
      res.data.forEach(element => {
        this.taskList.push(new TaskModel(element))
      });
      console.log(this.taskList)
    }
  }

  editTask(item) {
    this.taskForm = new TaskModel(item);
    this.createTaskView = true;
    console.log(this.taskForm)
  }

}
