import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AvgComponent } from './avg/avg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: EquipmentComponent,
        children: [
          { path: 'avg', loadChildren: './avg/avg.module#AvgModule' }
        ]
      }
    ]),
  ],
  declarations: [EquipmentComponent]
})
export class EquipmentModule { }
