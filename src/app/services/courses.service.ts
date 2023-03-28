import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Courses } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  constructor(private http:HttpClient) { }
  private baseUrl:string = environment.baseUrl;

  addCourses(courseData:any){
    return this.http.post(`${this.baseUrl}/courses/add`, courseData);
  }

  updateCourses(courseData:any){
    return this.http.put(`${this.baseUrl}/courses/update`, courseData);
  }

  getAllCourses(){
    return this.http.get<Courses[]>(`${this.baseUrl}/courses/`);
  }

  updateAllCourses(courseData:any){
    return this.http.put(`${this.baseUrl}/courses/updateAll`, courseData);
  }
}
