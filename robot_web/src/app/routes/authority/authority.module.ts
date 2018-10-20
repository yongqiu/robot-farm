import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorityComponent } from './authority.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild([{ path: '', component: AuthorityComponent }]),
  ],
  declarations: [AuthorityComponent]
})
export class AuthorityModule { }
