import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coursesSort'
})
export class CoursesSortPipe implements PipeTransform {

  public data: any[] = [];

  transform(value: any[], args?: any): any[] {

    console.log(value, args);
    this.data.length = 0;
    console.log(this.data);
    
    for (let index = 0; index < value.length; index++) {
      console.log(value[index].start_date);
      
      if (args === value[index].course_name) {
        this.data.push(value[index]);
        console.log(this.data);
        return this.data;
      }
      else if (args === value[index].educator.educator_name) {
        this.data.push(value[index]);
        return this.data;
      }
      else if (args === value[index].course_mode) {
        this.data.push(value[index]);
        return this.data;
      }
      else if (args == value[index].start_date) {
        this.data.push(value[index]);
        console.log(this.data);

        return this.data;
      }
      else if (args === value[index].end_date) {
        this.data.push(value[index]);
        return this.data;
      }
      else if (args === value[index].contact_session_timing) {
        this.data.push(value[index]);
        return this.data;
      }
    }
    // 
    return value;
  }

}
