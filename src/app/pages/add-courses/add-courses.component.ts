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
export class AddCoursesComponent implements OnInit {
  educators!: any;
  currentUser: any = {
    id: 0,
    authorities: [{
      authority: ''
    }]
  };

  durationInSeconds = 2;
  userdata!: any;
  endTime = '';
  allCourses: any[] = [];
  //today's date
todayDate:Date = new Date();


  constructor(
    private api: LoginService,
    private _courses: CoursesService,
    private _snackBar: MatSnackBar,
  ) {
    this.currentUser = this.api.getUser();
  }

  ngOnInit(): void {
    this.getAllEducators();
    this.getAllCourses();
  }
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
    venue: new FormControl('', Validators.required),
    course_mode: new FormControl('', [Validators.required]),
    status: new FormControl(true),
    location: new FormControl('', [Validators.required]),
    course_type: new FormControl('', [Validators.required]),
    educator: new FormGroup({
      id: new FormControl(0, [Validators.required]),
    })
  })

  getAllEducators() {
    this.api.getActiveEducator().subscribe(
      (res) => {
        this.educators = res;
      },
      (err: HttpErrorResponse) => {
        this._snackBar.open('Server Error!!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  getAllCourses() {
    this._courses.getAllCourses().subscribe(
      (res) => {
        this.allCourses = res;
        localStorage.setItem("courseData", JSON.stringify(this.allCourses));
      },
      (error: HttpErrorResponse) => {
        this._snackBar.open('Server Error!!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  isExist: any = true;

  // educator , date , time
  onCheckCourseValidator() {
    let data = new Array();
    let course = localStorage.getItem("courseData")!;
    const startDate = this.courses.get('start_date')?.value!;
    const sDate = new Date(startDate);
    sDate.setDate(sDate.getDate() + 1);
    this.courses.get('start_date')!.setValue(sDate.toISOString().substring(0, 10));
    data = JSON.parse(course);

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.course_name === this.courses.value.course_name &&
        element.educator.id === this.courses.value.educator?.id &&
        element.start_date === this.courses.value.start_date &&
        element.start_time === this.courses.value.start_time &&
        element.start_time >= this.courses.value.start_time! &&
        element.end_time <= this.courses.value.end_time!) {
        this.isExist = false;
        break
      }
    }
  }

  onVenue() {
    if (this.courses.value.course_mode == "VCR") {
      this.courses.get('venue')!.setValue("Virtual Classroom - India");
    }
    else {
      this.courses.value.venue = "";
    }
  }

  onSubmit() {
    this.courses.get('educator.id')!.setValue(this.currentUser.id);
    this.onCheckCourseValidator();
    if (this.courses.value.course_type == "RBT") {
      if (this.courses.value.course_mode == "VCR") {
        if (this.courses.value.course_name == "Agility and Scrum" || this.courses.value.course_name == "Introduction to DevOps" || this.courses.value.course_name == "Agility and Kanban") {
          this.courses.value.no_of_slots = '300'
        }
        else {
          this.courses.value.no_of_slots = '99'
        }
      }
      else{
        this.courses.get('no_of_slots')!.setValue('60');
      }
    }
    else {
      this.courses.get('no_of_slots')!.setValue('60');
    }

    if (this.courses.value.start_time == '' || this.courses.value.start_time == null || this.courses.value.end_time == '' || this.courses.value.end_time == null) {
      this._snackBar.open('Contact Session Timing is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else {
      const time = new Date(`01/01/2022 ${this.courses.value.start_time}`);
      const hour = time.getHours();
      if (hour >= 21 || hour < 6) {
        this._snackBar.open('Please choose relevant time for course !!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
      else {
        this.courses.value.contact_session_timing = this.courses.value.start_time + '-' + this.courses.value.end_time;
      }
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
      // alert(JSON.stringify(this.courses.value));
      // return
      if (this.isExist == false) {
        this._snackBar.open('Course is already exist on that date and time for that Educator !!', 'Close', {
          duration: this.durationInSeconds * 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        setTimeout(() => {

          this._snackBar.open('Please choose another educator or Course or Date or Time!!', 'Close', {
            duration: this.durationInSeconds * 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }, 4000);
        this.courses.reset();
      }
      else {
        this.addCourses();
        this.courses.reset();
      }
    }
  }

  addCourses() {
    this._courses.addCourses(this.courses.value).subscribe(
      (data: any) => {
        this.getAllCourses();
        this._snackBar.open('Successfully done !!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        //error
        this._snackBar.open('Something went wrong !!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
        });
      })
  }

  courseDetails: any[] = [
    { name: 'Agility and Scrum', day: 1, duration: 2, level: 1 },
    { name: 'Introduction to DevOps', day: 1, duration: 2, level: 1 },
    { name: 'Agility and Kanban', day: 1, duration: 2, level: 1 },
    { name: 'Agile Scrum in Practice', day: 3, duration: 3.5, level: 2 },
    { name: 'Kanban in Practice', day: 3, duration: 3.5, level: 2 },
    { name: 'ALM with Jira Agile', day: 1, duration: 3.5, level: 2 },
    { name: 'Introduction to Scaled Agile Framework', day: 1, duration: 4, level: 3 },
    { name: 'DevOps CICD Dotnet', day: 4, duration: 3.5, level: 3 },
    { name: 'SCM using GIT', day: 1, duration: 3.5, level: 2 },
    { name: 'DevOps CI/CICD', day: 5, duration: 4, level: 3 },
    { name: 'DevOps using Ansible', day: 3, duration: 4, level: 3 }
  ]

  updateEndDate(): void {
    const courseName = this.courses.get('course_name')!.value;
    const startDate = this.courses.get('start_date')!.value;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    if (startDate) {
      const course = this.courseDetails.find(course => course.name === courseName);
      const day = course ? course.day : 1;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + day);
      this.courses.get('end_date')!.setValue(endDate.toISOString().substring(0, 10));
      // console.log(endDate.toISOString().substring(0, 10));

      this.courses.get('month')!.setValue(monthNames[endDate.getMonth()] + '-' + endDate.getFullYear());
    }
  }

  calculateEndTime() {
    const selectedCourse: any = this.courseDetails.find(course => course.name === this.courses.get('course_name')!.value);
    const selectedStartTime = this.courses.get('start_time')!.value;

    const durationInHours = selectedCourse.duration;
    const [startHour, startMinute] = selectedStartTime!.split(':');

    let endHour = parseInt(startHour) + Math.floor(durationInHours);
    let endMinute = parseInt(startMinute) + (durationInHours % 1) * 60;
    if (endMinute > 59) {
      endHour += Math.floor(endMinute / 60);
      endMinute = endMinute % 60;
    }
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    this.courses.patchValue({ end_time: endTime });
  }

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