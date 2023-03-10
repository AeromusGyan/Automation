import { DatePipe, formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Courses } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  constructor(
    private _courses: CoursesService,
    private _snackBar: MatSnackBar,
    private excel: ExcelService,
    private datePipe: DatePipe
  ) { }
  sortoption: string = '';
  allCourses: Courses[] = [];
  dataSource: any[] = [];
  educator = '';
  courses = '';
  mode = '';
  start = '';
  end = '';
  contact = '';
  displayedColumns!: any[];
  ngOnInit() {
    this.getAllCourses();
    this.displayedColumns = ['Offerings Id', 'Type', 'Course Name', 'CR/VCR', 'Location', 'Educator', 'Start Date', 'End Date', 'Start Time', 'End Time', 'Contact Session Timing', 'Venue', 'Slots', 'Registration Link'];
  }
  getAllCourses() {
    this._courses.getAllCourses().subscribe(
      (res) => {
        this.allCourses = res;
        this.allCourses.forEach(element => {
          var courseExcel = {
            offerings_id: '',
            course_type: '',
            course_name: '',
            course_mode: '',
            location: '',
            educator: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            contact_session_timing: '',
            venue: '',
            no_of_slots: 0,
            registration_link: ''
          };
          courseExcel.offerings_id = '';
          courseExcel.course_type = element.course_type;
          courseExcel.course_name = element.course_name;
          courseExcel.course_mode = element.course_mode;
          courseExcel.location = this.getLocation(element.location);
          courseExcel.educator = element.educator.educator_name;
          courseExcel.start_date = formatDate(element.start_date, 'dd-MMM-y', 'en');
          courseExcel.end_date = formatDate(element.end_date, 'dd-MMM-y', 'en');
          courseExcel.start_time = this.timeShort(element.start_time);
          courseExcel.end_time = this.timeShort(element.end_time);
          courseExcel.contact_session_timing = this.timeConverter(element.contact_session_timing);
          courseExcel.venue = this.getLocation(element.venue);
          courseExcel.no_of_slots = parseInt(element.no_of_slots);
          courseExcel.registration_link = '';
          this.dataSource.push(courseExcel);
        });
      },
      (err: HttpErrorResponse) => {
        this._snackBar.open('Server error !!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  getLocation(loc: any) {
    if (loc == '') {
      return "N.A."
    }
    else {
      return loc;
    }
  }

  timeConverter(time: any) {
    if (time >= '6' || time < '12') {
      return 'Morning';
    }
    else if (time >= '12' || time < '17') {
      return 'Afternoon';
    }
    else if (time >= '17' || time < '21') {
      return 'Evening';
    }
    else {
      return 'Night';
    }
  }

  timeShort(time: any) {
    const minutes = time.slice(3, 5);
    // console.log();

    if (time >= '01' && time <= '12') {
      return time + ' AM';
    }
    else {
      const short = parseFloat(time) - 12;
      return short + ':' + minutes + ' PM';
    }
  }

  exportToExcel() {
    this.excel.exportAsExcelFile('Infosys Automation System', '', this.displayedColumns, this.dataSource, 'Infosys Automation System', 'Sheet1');
  }
  singleCourse: any = {
    educator: {

    }
  };

  onEdit(index: any) {
    // localStorage.setItem('data', JSON.stringify(this.allCourses[index]));
    this.singleCourse = this.allCourses[index];
  }

  onUpdate() {
    // alert(JSON.stringify(this.singleCourse));

    if (this.singleCourse.start_time == '' || this.singleCourse.start_time == null || this.singleCourse.end_time == '' || this.singleCourse.end_time == null) {
      this._snackBar.open('Contact Session Timing is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.singleCourse.no_of_slots == '' || this.singleCourse.no_of_slots == null) {
      this._snackBar.open('Slots to be opened is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else {
      this.singleCourse.contact_session_timing = this.singleCourse.start_time + '-' + this.singleCourse.end_time;
      this.updateCourses();
    }
  }
  durationInSeconds = 2;
  updateMessage: string = "";

  updateCourses() {
    this._courses.addCourses(this.singleCourse).subscribe(
      (data: any) => {
        this.updateMessage = "Course is successfully updated.";
        setTimeout(() => {
          this.updateMessage = "";
        }, 3000);

        // this._snackBar.open('Successfully Updated !!', 'Close', {
        //   duration: this.durationInSeconds * 1000,
        //   verticalPosition: 'bottom',
        // });
      },
      (error) => {
        //error
        this._snackBar.open('Something went wrong !!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
        });
      })
  }
}
