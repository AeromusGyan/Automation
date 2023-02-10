import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coursesSort'
})
export class CoursesSortPipe implements PipeTransform {

  transform(value: any[], args?: any): any[] {
    // console.log(value, args);
    for (let index = 0; index < value.length; index++) {
    const data:any[] = [];
      if (args === value[index].course_name) {
        data.push(value[index]);
        return data;
      }
      else if (args === value[index].educator.educator_name) {
        data.push(value[index]);
        return data;
      }
      else if (args === value[index].course_mode) {
        data.push(value[index]);
        return data;
      }
      else if (args === value[index].start_date) {
        data.push(value[index]);
        return data;
      }
      else if (args === value[index].end_date) {
        data.push(value[index]);
        return data;
      }
      else if (args === value[index].contact_session_timing) {
        data.push(value[index]);
        return data;
      }
    }
    // 
    return value;
  }

}
