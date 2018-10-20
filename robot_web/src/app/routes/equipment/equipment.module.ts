import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AvgComponent } from './avg/avg.component';
import { PlateComponent } from './plate/plate.component';
import { RobotComponent } from './robot/robot.component';
import { FrameComponent } from './frame/frame.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      { path: ':type', component: EquipmentComponent }
    ]),
  ],
  declarations: [EquipmentComponent, AvgComponent, PlateComponent, RobotComponent, FrameComponent]
})
export class EquipmentModule { }
