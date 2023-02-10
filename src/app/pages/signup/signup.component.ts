import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private api: LoginService, 
    private http: HttpClient, 
    private _snackBar: MatSnackBar, 
    ) { }
  hide = true;
  memberForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    educator_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl(formatDate(new Date(), 'yyyy-dd-mm-hh-mm-ss-a', 'en')),

  })
  durationInSeconds = 2;

  mailObject:any = {
    to: "",
    subject: "",
    message: ""
  }

  ngOnInit(): void {
    
  }

  Submit() {
    if (this.memberForm.value.username == '' || this.memberForm.value.username == null) {
      this._snackBar.open('Username is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.password == '' || this.memberForm.value.password == null) {
      this._snackBar.open('Password is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.educator_name == '' || this.memberForm.value.educator_name == null) {
      this._snackBar.open('Firstname is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.email == '' || this.memberForm.value.email == null) {
      this._snackBar.open('Email is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else {
      this.AddMember();
    }
  }
  
  AddMember() {
    this.api.addMember(this.memberForm.value).subscribe(
      (data: any) => {
        //success
        // console.log(data);
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

  sendMail(){
    // this.mailObject.to = this.memberForm.value.email;
    // this.mailObject.subject  = this.memberForm.value.firstname + " Successfully Registerd on Sciaku.com";
    // this.mailObject.message = "<div style='background-color:#fff; color:#000; height:100%;'>"
    //                         + "<div style='background-color:#000; color:#fff; height:100%;'>"
    //                         + "<img src='https://sciaku.com/assets/images/Sciaku.png' alt='Logo' style='height:70px; text-align:center; margin-left:135px;'/></div></br>"
    //                         + "<div style='border: 2px solid black; border-radius: 0px 0px 20px 20px; text-align:center;'><h4>"
    //                         + this.memberForm.value.firstname +" " + this.memberForm.value.lastname
    //                         + "</h4><p>Welcome in Sciaku. You have successfully Registered on <a href='www.sciaku.com'>Sciaku.com</a></p>"
    //                         + "<h3>Your Username : <b>" + this.memberForm.value.username +"</b></h3>"
    //                         + "<h3>Your Password : <b>" + this.memberForm.value.password +"</b></h3>"
    //                         + "<p><a href='www.sciaku.com/login'>Click here</a> to Login on Website</p>"
    //                         + "<p><a style='text-align:center;' href='#'>Unsubscribe</a></p>"
    //                         + "</div></div>"; 
    // this.mailApi.sendMail(this.mailObject).subscribe(
    //   (data:any)=>{
    //     console.log("mail is send!!" + data);
    //   },
    //   (error:any)=>{

    //   }
    // )
  }
}
