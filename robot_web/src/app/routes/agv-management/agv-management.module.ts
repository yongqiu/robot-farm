import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgvManagementComponent } from './agv-management.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([{ path: '', component: AgvManagementComponent }]),
  ],
  declarations: [AgvManagementComponent]
})
export class AgvManagementModule { }
