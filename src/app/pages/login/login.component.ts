import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loggedIn: boolean = false;
  
  hide = true;
  durationInSeconds: any = 3;
  constructor(
    private login: LoginService,
    private _snackBar: MatSnackBar, 
    private router: Router,
    ) { }

  memberForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  ngOnInit(): void {
  }

  Submit() {
    if ((this.memberForm.value.username == '' || this.memberForm.value.username == null) && (this.memberForm.value.password == '' || this.memberForm.value.password == null)) {
      this._snackBar.open('Username and Password is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.username == '' || this.memberForm.value.username == null) {
      this._snackBar.open('Username is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.memberForm.value.password == '' || this.memberForm.value.password == null) {
      this._snackBar.open('Password is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else {
      // request for generate token
      this.login.generateToken(this.memberForm.value).subscribe(
        (data: any) => {
          // Login
          // console.log("sucess");
          this.login.loginUser(data.token);
          this.login.getCurrentUser().subscribe(
            (user: any) => {
              this.login.setUser(user);
              if (user!= null) {
                window.location.href = "/dashboard"
                // this.router.navigate(["dashboard"]);
              }
              else {
                this.login.logout();
                window.location.href = "/login"
              }
            },
            (error) => {
              console.log(error);
              this._snackBar.open('User not found !!','Close', {
                duration: this.durationInSeconds * 1000,
                verticalPosition:'bottom',
            });
            }
          )
        },
        (error) => {
          console.log(error);
          this._snackBar.open('Server Error !!','Close', {
            duration: this.durationInSeconds * 1000,
            verticalPosition:'bottom',
        });
        }
      )
    }
  }
}
