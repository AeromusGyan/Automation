import { Component, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './services/courses.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Automation';

  currentUser:any={
    id:0,
    authorities:[{
      authority:''
    }]
  };

  singleCourse: any = {
    educator: {}
  };

  constructor(
    private api:LoginService,
    ){
    this.currentUser = this.api.getUser();
    if(navigator.onLine) {
      console.log("You are Online")
     }
     else {
      alert("You are Offline")
     }
  }
  
  logout(){
    this.api.logout();
    window.location.href = "/login"
  }
}
