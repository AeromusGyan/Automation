import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userdata!:any;

  constructor(private api:LoginService){
    // console.log(this.userdata);
    
    this.userdata = this.api.getUser();
    // console.log(this.userdata);

  }

  logout(){
    this.api.logout();
    window.location.href = "/login"
  }
}
