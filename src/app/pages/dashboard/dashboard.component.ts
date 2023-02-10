import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component,  OnInit,  ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { Courses } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
  // filename="automation.xlsx"
  constructor(
    private _courses:CoursesService,
    private _snackBar: MatSnackBar, 
    private excel:ExcelService
  ){ }
  sortoption: string = '';
  allCourses: Courses[] = [];
  dataSource: any[] = [];
  educator= '';
  courses= '';
  mode='';
  start='';
  end='';
  contact = '';
  displayedColumns!: any[];
  ngOnInit(){
    this.getAllCourses();
    this.displayedColumns = ['Offerings Id', 'Course Name', 'CR/VCR', 'Location', 'Educator', 'Start Date', 'End Date', 'Start Time', 'End Time','Contact Session Timing', 'Venue'];
  }
  getAllCourses(){
    this._courses.getAllCourses().subscribe(
      (res)=>{
          this.allCourses = res;
          // for (let i = 0; i < this.allCourses.length; i++) {
          //   this.dataSource.push(this.allCourses[i].cId);            
          // }
          // this.dataSource = this.allCourses;
          // console.log(this.dataSource);
      },
      (err:HttpErrorResponse)=>{
        this._snackBar.open('No Of Slots is required !!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    )
  }

  getLocation(loc:any){
    if (loc == '') {
      return "N.A."
    }
    else{
      return loc;
    }
  }

  timeConverter(time:any){
    if(time >= '6' || time < '12'){
      return 'Morning';
    }
    else if(time >= '12' || time < '17'){
      return 'Afternoon';
    }
    else if(time >= '17' || time < '21'){
      return 'Evening';
    }
    else{
      return 'Night';
    }
  }

  timeShort(time:any){
    if(time >= '01' && time <= '12'){
      return time+' AM';
    }
    else{
      const short = parseFloat(time) -12;
      return short + ' PM'
    }
  }

  exportToExcel(){
    this.excel.exportAsExcelFile('Infosys Automation System','',this.displayedColumns, this.allCourses,'Infosys Automation System','Sheet1');
  }

}

export interface PeriodicElement {
  name: string;
  mode: string;
  weight: string;
  symbol: string;
  courses: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
];

