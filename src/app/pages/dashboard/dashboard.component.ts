import { DatePipe, formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Courses } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ExcelService } from 'src/app/services/excel.service';
import { LoginService } from 'src/app/services/login.service';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<any>();
  constructor(
    private _courses: CoursesService,
    private _snackBar: MatSnackBar,
    private excel: ExcelService,
    private api:LoginService,
    public dialog: MatDialog
  ) { }

  sortoption: string = '';
  allCourses: Courses[] = [];
  dataSource: any[] = [];

  // educator = '';
  courses = '';
  mode = '';
  start = '';
  end = '';
  contact = '';

  displayedColumns!: any[];
  currentUser:any={
    id:0,
    authorities:[{
      authority:''
    }]
  };
  educators:any = {
    authorities:[{
      authority:''
    }]
  };
  durationInSeconds = 2;
  monthNames:any = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    mData:Courses[] = [];
  ngOnInit() {
    this.currentUser = this.api.getUser();
    this.getAllEducators();
    this.getAllCourses();
    this.displayedColumns = ['Offering_Id', 'Type', 'Course_Id', 'Course_Name', 'CR_VCR', 'Location', 'Educator', 'Start_Date', 'End_Date', 'Month', 'Start_Time', 'End_Time', 'Contact_Session_Timing', 'Venue', 'Slots', 'Registration_Link'];
  }

  getMonthlyData(month:any){
    this._courses.getDataByType(0,0,month,0).subscribe(
      (res:any)=>{
        this.allCourses.length = 0;
        this.allCourses = res;
        this.mData = this.allCourses;
      },
      (error:any)=>{
        console.log(error);
        
      }
    )
  }

  getDataByCName(cname:any){
    const data = this.mData.filter((obj: { course_name: string | any[]; }) => obj.course_name.includes(cname));
    this.allCourses = data;

    // this._courses.getDataByType(0,0,0,cname).subscribe(
    //   (res: any) => {
    //     this.allCourses.length = 0;
    //     this.allCourses = res;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error);
    //   }
    // )
  }

  getDataByType(mode:any){
    const data = this.mData.filter(((obj: { course_mode: any; }) => obj.course_mode === mode));
    this.allCourses = data;    

    // this._courses.getDataByType(0,mode,0,0).subscribe(
    //   (res: any) => {
    //     this.allCourses.length = 0;
    //     this.allCourses = res;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error);
    //   }
    // )
  }

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
        this.mData = this.allCourses;       
        console.log(this.mData.sort((a:any,b:any)=> b.cId - a.cId)); 
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
  onNone(){
    this.allCourses = this.mData;
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
    var hours = parseInt(time.substr(0, 2));
    var minutes = time.substr(3, 2);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var formattedTime = hours + ':' + minutes + ' ' + ampm;
    return formattedTime;
  }

  exportToExcel() {
    this.mData.forEach(element => {
      var courseExcel = {
        offering_id: '',
        course_type: '',
        course_id: 0,
        course_name: '',
        course_mode: '',
        location: '',
        educator: '',
        start_date: '',
        end_date: '',
        month:'',
        start_time: '',
        end_time: '',
        contact_session_timing: '',
        venue: '',
        no_of_slots: 0,
        registration_link: ''
      };
      courseExcel.offering_id = '';
      courseExcel.course_type = element.course_type;
      courseExcel.course_id = element.cId;
      courseExcel.course_name = element.course_name;
      courseExcel.course_mode = element.course_mode;
      courseExcel.location = this.getLocation(element.location);
      courseExcel.educator = element.educator.educator_name;
      courseExcel.start_date = formatDate(element.start_date, 'dd-MMM-y', 'en');
      courseExcel.end_date = formatDate(element.end_date, 'dd-MMM-y', 'en');
      courseExcel.month = element.month;
      courseExcel.start_time = this.timeShort(element.start_time);
      courseExcel.end_time = this.timeShort(element.end_time);
      courseExcel.contact_session_timing = this.timeConverter(element.contact_session_timing);
      courseExcel.venue = this.getLocation(element.venue);
      courseExcel.no_of_slots = parseInt(element.no_of_slots);
      courseExcel.registration_link = element.registration_link;
      this.dataSource.push(courseExcel);
    });
    this.excel.exportAsExcelFile('Infosys Automation System', '', this.displayedColumns, this.dataSource, 'Infosys Automation System', 'Sheet1');
  }

  onEdit(index: any) {
    let dialogRef = this.dialog.open(UpdateComponent, {
      data: this.allCourses[index],
      // height: '400px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCourses();
        }
      }
    })
  }

  pageEvent!: PageEvent;
  pageSize = 5;
  pageIndex = 0;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
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
}
