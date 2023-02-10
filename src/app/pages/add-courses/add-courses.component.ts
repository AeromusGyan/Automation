import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Courses } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})
export class AddCoursesComponent implements OnInit{
  educators!: any;
  constructor(
    private api:LoginService,
    private _courses:CoursesService,
    private _snackBar: MatSnackBar, 
    ){ 
    // this.userdata = this.api.getUser();
  }

  durationInSeconds = 2;
  ngOnInit(): void {
    this.getAllEducators();
  }

  userdata!:any;

  courses:Courses={
    cId: 0,
    course_name: '',
    start_date: '',
    end_date: '',
    month: '',
    start_time: '',
    end_time: '',
    contact_session_timing: '',
    no_of_slots: '',
    venue: '',
    course_mode: '',
    registration_link: '',
    status: true,
    educator: {
      id: 0,
      educator_name:''
    },
    location: '',
    course_type: ''
  }

  getAllEducators(){
    this.api.getActiveEducator().subscribe(
      (res)=>{
        this.educators = res;        
      },
      (err:HttpErrorResponse)=>{
        this._snackBar.open('CServer Error!!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  onSubmit() {
    // alert(JSON.stringify(this.memberForm.value));
    if (this.courses.start_time == '' || this.courses.start_time == null || this.courses.end_time == '' || this.courses.end_time == null) {
      this._snackBar.open('Contact Session Timing is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else{
      this.courses.contact_session_timing = this.courses.start_time + '-' + this.courses.end_time;
    }
    if (this.courses.educator.id == 0 || this.courses.educator.id == null) {
      this._snackBar.open('Instructor is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.course_name == '' || this.courses.course_name == null) {
      this._snackBar.open('Course Name is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.start_date == '' || this.courses.start_date == null) {
      this._snackBar.open('Start Date is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.end_date == '' || this.courses.end_date == null) {
      this._snackBar.open('End Date is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.contact_session_timing == '' || this.courses.contact_session_timing == null) {
      this._snackBar.open('Contact Session Timing is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.course_mode == '' || this.courses.course_mode == null) {
      this._snackBar.open('Course Mode is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.no_of_slots == '' || this.courses.no_of_slots == null) {
      this._snackBar.open('No Of Slots is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else {
      this.addCourses();
    }
  }
  
  addCourses() {
    this._courses.addCourses(this.courses).subscribe(
      (data: any) => {
        this._snackBar.open('Successfully done !!','Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition:'bottom',
      });
      },
      (error) => {
        //error
          this._snackBar.open('Something went wrong !!','Close', {
            duration: this.durationInSeconds * 1000,
            verticalPosition:'bottom',
        });
      })
  }
}
