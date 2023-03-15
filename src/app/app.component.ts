import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Automation';
  constructor(){
    if(navigator.onLine) {
      console.log("You are Online")
     }
     else {
      alert("You are Offline")
     }
  }
}
