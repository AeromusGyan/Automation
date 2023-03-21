import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Automation';
  
  userdata!:any;
  logout(){
    this.api.logout();
    window.location.href = "/login"
  }
  constructor(private api:LoginService){
    // console.log(this.userdata);
    
    this.userdata = this.api.getUser();
    if(navigator.onLine) {
      console.log("You are Online")
     }
     else {
      alert("You are Offline")
     }
  }
}
