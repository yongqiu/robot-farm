import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LayoutComponent } from './routes/layout/layout.component';
import { RouterModule } from '@angular/router';
import { PermissionService } from './service/permission/permission.service';
import { RequestService } from './service/request.service';
import { Http, HttpModule } from '@angular/http';
import { CanAuthProvide } from './service/guard/can-auth.provide';
import { RobotPipeModule } from './common/pipe/robot-pipe.module';
import { TaskService } from './service/task/task.service';
import { TaskRequestService } from './service/task/task.request';

registerLocaleData(zh);
export const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    children: [{ path: '', loadChildren: './routes/login/login.module#LoginModule' }]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [CanAuthProvide],
    children: [
      { path: 'equipment', loadChildren: './routes/equipment/equipment.module#EquipmentModule' },
      { path: 'product', loadChildren: './routes/product/product.module#ProductModule' },
      { path: 'backend', loadChildren: './routes/backend/backend.module#BackendModule' },
      { path: 'authority', loadChildren: './routes/authority/authority.module#AuthorityModule' },
      { path: 'avgManage', loadChildren: './routes/agv-management/agv-management.module#AgvManagementModule' },
    ]
  },
  // {
  //   path: 'settings',
  //   children: [{ path: '', loadChildren: './routes/settings/settings.module#SettingsModule' }]
  // },
  // {
  //   path: 'login',
  //   children: [{ path: '', loadChildren: './routes/login2/login2.module#Login2Module' }]
  // },
  // {
  //   path: 'select',
  //   children: [{ path: '', loadChildren: './routes/select/select.module#SelectModule' }]
  // }
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RobotPipeModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, PermissionService, RequestService, CanAuthProvide, TaskService, TaskRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
