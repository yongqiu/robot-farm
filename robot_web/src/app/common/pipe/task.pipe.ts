import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'taskPipe'
})
export class TaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args == 'type') {
      switch (value) {
        case 1:
          return '普通任务';
        case 2:
          return '单盘任务';
        default:
          return '普通任务';
      }
    }

    if (args == 'direction') {
      switch (value) {
        case 1:
          return '上架';
        case 2:
          return '下架';
        default:
          return '上架';
      }
    }

  }

}
