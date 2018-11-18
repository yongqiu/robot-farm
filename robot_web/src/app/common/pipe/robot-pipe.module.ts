import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePipe } from './date-time.pipe';
import { TaskPipe } from './task.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DateTimePipe, TaskPipe],
  exports: [DateTimePipe, TaskPipe]
})
export class RobotPipeModule { }
