import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/service/socket/socket.service';

@Component({
  selector: 'app-agv-management',
  templateUrl: './agv-management.component.html',
  styleUrls: ['./agv-management.component.scss']
})
export class AgvManagementComponent implements OnInit {

  constructor(private socketServ: SocketService) { }

  ngOnInit() {
    this.socketServ.initSocket()
  }

}
