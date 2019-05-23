import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService} from 'src/app/service/task/task.service';
import { Observable } from 'rxjs';
import { TaskRequestService } from 'src/app/service/task/task.request';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-agv-management',
  templateUrl: './agv-management.component.html',
  styleUrls: ['./agv-management.component.scss']
})
export class AgvManagementComponent implements OnInit {
  @ViewChild('agvPanel') agvPanel: ElementRef;
  private socket: any;
  currentAgv:any;
  name: string;
  editAgv = false;
  constructor(public taskReq: TaskRequestService, public taskServ: TaskService, private message: NzMessageService) { }

  ngOnInit() {
    
  }

  editAgvHandle(agv){
    this.currentAgv = agv;
    this.editAgv = true;
  }

  async submit(){
    let res =  await this.taskReq.changeAgvName(this.currentAgv.id, this.name)
    if(res.success){
      await this.taskServ.getAgvList()
      this.message.success('更新成功')
      this.editAgv = false;
      this.name = null;
    }
  }


}
