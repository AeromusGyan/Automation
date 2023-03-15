import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  }

  durationInSeconds = 2;
  ngOnInit(): void {
    this.getAllEducators();
    this.getAllCourses();
  }

  userdata!:any;

  // courses:Courses={
  //   cId: 0,
  //   course_name: '',
  //   start_date: '',
  //   end_date: '',
  //   month: '',
  //   start_time: '',
  //   end_time: '',
  //   contact_session_timing: '',
  //   no_of_slots: '',
  //   venue: '',
  //   course_mode: '',
  //   registration_link: '',
  //   status: true,
  //   educator: {
  //     id: 0,
  //     educator_name:''
  //   },
  //   location: '',
  //   course_type: ''
  // }
// , [Validators.required, Validators.min(30), Validators.max(300)]

  courses = new FormGroup({
    course_name: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    month: new FormControl(''),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    contact_session_timing: new FormControl(''),
    no_of_slots: new FormControl(''),
    venue: new FormControl(' ', Validators.required),
    course_mode: new FormControl('', [Validators.required]),
    status: new FormControl(true),
    location: new FormControl('', [Validators.required]),
    course_type: new FormControl('', [Validators.required]),
    educator: new FormGroup({
      id: new FormControl(null, [Validators.required]),
    })
  })

  getAllEducators(){
    this.api.getActiveEducator().subscribe(
      (res)=>{
        this.educators = res;        
      },
      (err:HttpErrorResponse)=>{
        this._snackBar.open('Server Error!!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }
  allCourses:any[] = [];

  getAllCourses(){
    this._courses.getAllCourses().subscribe(
      (res)=>{
        this.allCourses = res;
        localStorage.setItem("courseData", JSON.stringify(this.allCourses));
      },
      (error:HttpErrorResponse)=>{
        this._snackBar.open('Server Error!!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  isExist:any = true;

  // educator , date , time
  onCheckCourseValidator(){
    let data = new Array();
    let course = localStorage.getItem("courseData")!;
    data = JSON.parse(course);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // console.log(JSON.stringify(data[index]));
      if (element.course_name == this.courses.value.course_name) {
        console.log(element.course_name);
        if (element.educator.id == this.courses.value.educator?.id) {
          console.log(element.educator.id);
          if (element.start_date == this.courses.value.start_date) {
            console.log(element.start_date);
            if (element.start_time == this.courses.value.start_time) {
              this.isExist = false;
              console.log(element.start_time);
              break
            }
          }
        }
      }
    }
  }
  
  onVenue(){
    if (this.courses.value.course_mode == "VCR") {
      this.courses.value.venue = "Virtual Classroom - India";
      console.log(this.courses.value.venue);
    }
    else{
      this.courses.value.venue = "";
    }
  }

  onSubmit() {
    this.onCheckCourseValidator();
    if (this.isExist == false) {
      this._snackBar.open('Course is already exist on that date and time for that Educator !!', 'Close', {
        duration: this.durationInSeconds * 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    
    if (this.courses.value.course_type == "RBT") {
      if (this.courses.value.course_mode == "VCR") {
        if (this.courses.value.course_name=="Agility and Scrum"|| this.courses.value.course_name=="Introduction to DevOps" ||
        this.courses.value.course_name=="Agility and Kanban") {
          this.courses.value.no_of_slots = '300'
        }
        else{
          this.courses.value.no_of_slots = '99'
        }
      }
    }
    else{
      this.courses.value.no_of_slots = '60';
    }
    
    // return
    if (this.courses.value.start_time == '' || this.courses.value.start_time == null || this.courses.value.end_time == '' || this.courses.value.end_time == null) {
      this._snackBar.open('Contact Session Timing is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else{
      this.courses.value.contact_session_timing = this.courses.value.start_time + '-' + this.courses.value.end_time;
    }
    if (this.courses.value.educator?.id == undefined || this.courses.value.educator?.id == null) {
      this._snackBar.open('Instructor is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.value.course_name == '' || this.courses.value.course_name == null) {
      this._snackBar.open('Course Name is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.value.start_date == '' || this.courses.value.start_date == null) {
      this._snackBar.open('Start Date is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.value.end_date == '' || this.courses.value.end_date == null) {
      this._snackBar.open('End Date is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.value.contact_session_timing == '' || this.courses.value.contact_session_timing == null) {
      this._snackBar.open('Contact Session Timing is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.value.course_mode == '' || this.courses.value.course_mode == null) {
      this._snackBar.open('Course Mode is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.courses.value.no_of_slots == '' || this.courses.value.no_of_slots == null) {
      this._snackBar.open('No Of Slots is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else {
      // const month = this.courses.value.start_date;
      // this.courses.value.month = month.slice(3,7);
    // alert(JSON.stringify(this.courses.value));
    // return
      this.addCourses();
    }
  }
  
  addCourses() {
    this._courses.addCourses(this.courses.value).subscribe(
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

  courseDetails:any[] = [
    {name: 'Agility and Scrum', day:1, duration:2, level:1},
    {name: 'Introduction to DevOps', day:1, duration:2, level:1},
    {name: 'Agility and Kanban', day:1, duration:2, level:1},
    {name: 'Agile Scrum in Practice', day:3, duration:3.5, level:2},
    {name: 'Kanban in Practice', day:3, duration:3.5, level:2 },
    {name: 'ALM with Jira Agile', day:1, duration:3.5, level: 2},
    {name: 'Introduction to Scaled Agile Framework', day:1, duration:4 , level:3},
    {name: 'DevOps CICD Dotnet', day:4, duration:3.5, level:3},
    {name: 'SCM using GIT', day:1, duration:3.5, level:2},
    {name: 'DevOps CI/CICD', day:5, duration:4, level:3},
    {name: 'DevOps using Ansible', day:3, duration:4, level:3}
  ]
}

// <!-- o
//     Agility and Scrum (1 x 2 hours) o 
//     Introduction to DevOps (1 x 2 hours) o 
//     Agility and Kanban (1 x 2 hours) o 
//     Agile Scrum in Practice (3 x 3.5 hours) o 
//     Kanban in Practice(3 x 3.5 hours) o 
//     ALM with Jira Agile (1 x 3.5 hours) o 
//     Introduction to Scaled Agile Framework (1 x 4 hours) o 
//     DevOps CICD Dotnet (4 x 3.5 hours) o 
//     SCM using GIT (1 x 3.5 hours) o 
//     DevOps CI/CICD (5 x 4 hours) o 
//     DevOps using Ansible (3 x 4 hour 
// -->