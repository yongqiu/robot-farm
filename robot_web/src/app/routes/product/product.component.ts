import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { RequestService } from '../../service/request.service';
import { TaskModel } from 'src/app/service/task/task.model';
import { TaskService } from 'src/app/service/task/task.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  i = 1;
  editCache = {};
  taskForm: TaskModel;
  frameList: any = [];
  gutterList: any = [];
  vegetableList: Array<string> = ['青菜', '土豆', '玉米'];
  createTaskView: boolean = false;
  constructor(private reqSev: RequestService, public taskSev: TaskService) {

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
        this.taskSev.taskList.push(new TaskModel(element))
      });
      console.log(this.taskSev.taskList)
    }
  }

  editTask(item) {
    this.taskForm = new TaskModel(item);
    this.createTaskView = true;
    console.log(this.taskForm)
  }

  startTask() {
    console.log(this.taskSev.taskList)

  }

}
