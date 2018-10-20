import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendComponent } from './backend.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { PositionManageComponent } from './position-manage/position-manage.component';
import { FrameManageComponent } from './frame-manage/frame-manage.component';
import { GreenManageComponent } from './green-manage/green-manage.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([{ path: ':type', component: BackendComponent }]),
  ],
  declarations: [BackendComponent, PositionManageComponent, FrameManageComponent, GreenManageComponent]
})
export class BackendModule { }
