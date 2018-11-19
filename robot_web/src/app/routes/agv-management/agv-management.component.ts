import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService} from 'src/app/service/task/task.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-agv-management',
  templateUrl: './agv-management.component.html',
  styleUrls: ['./agv-management.component.scss']
})
export class AgvManagementComponent implements OnInit {
  @ViewChild('agvPanel') agvPanel: ElementRef;
  private socket: any;
  constructor(public taskServ: TaskService) { }

  ngOnInit() {
    this.taskServ.initSocket();
    // const ESC_KEY = 27;
    // const nameInput = document.getElementById('name') as HTMLInputElement;
    // console.log(nameInput)
    // const subscription = this.fromEvent(this.agvPanel, 'keydown')
    //   .subscribe((e: KeyboardEvent) => {
    //     console.log(nameInput)
    //     if (e.keyCode === ESC_KEY) {
    //       // nameInput.value = '';
    //       console.log('esc is keydown')
    //     }
    //   });
    this.test()
  }

  async test() {
    let res = await this.escKeydown()
    console.log(res)
  }

  escKeydown() {
    return this.fromEvent(document, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        if (e.keyCode === 27) {
          // nameInput.value = '';
          console.log('esc is keydown')
          return e.keyCode
        }
      });
  }

  fromEvent(target, eventName) {
    return new Observable((observer) => {
      const handler = (e) => observer.next(e);

      // Add the event handler to the target
      target.addEventListener(eventName, handler);

      return () => {
        // Detach the event handler from the target
        target.removeEventListener(eventName, handler);
      };
    });
  }



}
