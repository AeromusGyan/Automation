import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // user:any =  SocialUser;
  loggedIn: boolean = false;
  
  hide = true;
  durationInSeconds: any = 3;
  constructor(
    // private login: LoginService,
    private _snackBar: MatSnackBar, 
    private router: Router,
    // private authService: SocialAuthService,
    // private location: Location
    ) { }

  memberForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   console.log(this.user);
      
    //   this.loggedIn = (user != null);
    // });
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
      // this.login.generateToken(this.memberForm.value).subscribe(
      //   (data: any) => {
      //     // Login
      //     // console.log("sucess");
      //     // console.log(data);
      //     this.login.loginUser(data.token);
      //     this.login.getCurrentUser().subscribe(
      //       (user: any) => {
      //         this.login.setUser(user);
      //         // console.log(user);
      //         // Redirect ....ADMIN admin dshboard
      //         //Redirect .....NORMAL normal dashboard
      //         if (this.login.getUserRole() == "ADMIN") {
      //           // Admin dashboard
      //           setTimeout(() => {
      //             window.location.href="/admin";
      //             // this.router.navigate(["admin"]);
      //           }, 1000);
      //           // Swal.fire('You are Logged in !!', 'User role is ' + this.login.getUserRole(), 'success');
      //         }
      //         else if (this.login.getUserRole() == "NORMAL") {
      //           // User dashboard
      //           // Swal.fire('You are Logged in !!', 'User role is ' + this.login.getUserRole(), 'success');
      //           // setTimeout(() => {
      //           //   this.location.back();
      //           //   // window.location.href='/';
      //           //   // this.router.navigate(["courses"]);
      //           // }, 1000);
      //         }
      //         else {
      //           this.login.logout();
      //         }
      //       }
      //     )
      //   },
      //   (error) => {
      //     console.log(error);
      //     Swal.fire('Warning', 'Invalid details Try again !!', 'error')
      //   }
      // )
    }
  }
}
