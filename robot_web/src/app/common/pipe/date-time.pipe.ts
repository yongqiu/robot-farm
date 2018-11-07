import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTimePipe'
})
export class DateTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (args) {
      case 'unix':
        return moment.unix(value).format("YYYY-MM-DD");
      default:
      return moment.unix(value).format("YYYY-MM-DD");
    }
  }

}
