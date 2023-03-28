import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  isUploaded = false;
  isNotUploaded = false;
  constructor(private _courses: CoursesService, private route:Router){}
  excelData:any = [
    {
      Course_Id:0,
      Type:'',
      Course_Name:'',
      Registration_Link:''
    }
  ];
  file:any;
  dataSource: any[] = [];

  selectExcel(event:any){
    this.file = event.target.files[0];
    const fileReader =new FileReader();
    fileReader.readAsBinaryString(this.file);
    fileReader.onload = (event:any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData,{type: 'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.excelData = data;
        this.excelData.forEach((element: { Course_Id: number, Offering_Id:0 ,Type:'',Course_Name:'', Registration_Link:'', CR_VCR:'', Start_Date:'', End_Date:'', Month:'', Start_Time:'', End_Time:'', }) =>{
          var courseExcel = {
            offeringId: 0,
            course_type: '',
            cId: 0,
            course_name: '',
            course_mode: '',
            location: '',
            educator: {
              id: 0
            },
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
          
        courseExcel.cId = element.Course_Id;
        courseExcel.offeringId = element.Offering_Id;
        courseExcel.course_type = element.Type;
        courseExcel.course_name = element.Course_Name;
        courseExcel.educator.id = element.Offering_Id;
        courseExcel.registration_link = element.Registration_Link;
        this.dataSource.push(courseExcel);
        })
      })
    }
  }

  upload(){
    this._courses.updateAllCourses(this.dataSource).subscribe(
      (res:any)=>{
        this.isUploaded = true;
        setTimeout(() => {
          this.isUploaded = false;
          this.route.navigate(["dashboard"]);
        }, 3000);
      },
      (error:HttpErrorResponse)=>{
        this.isNotUploaded = true;
        setTimeout(() => {
          this.isNotUploaded = false;
        }, 3000);
      }
    );
  }
}
