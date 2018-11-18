import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RobotPipeModule } from '../../common/pipe/robot-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RobotPipeModule,
    RouterModule.forChild([{ path: '', component: ProductComponent }]),
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
