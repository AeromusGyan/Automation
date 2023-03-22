import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,
    private _snackBar: MatSnackBar, ) { }

  private baseUrl:string = environment.baseUrl;

  // generate token
  generateToken(logindata:any){
    return this.http.post(`${this.baseUrl}/token`, logindata);
  }
  // Login user set token in local storage

  loginUser(token:any){
    localStorage.setItem("token",token);
    var jdate = new Date();
    localStorage.setItem("jdate",jdate.toString());
  }

  // get Current user details

  getCurrentUser(){
    return this.http.get(`${this.baseUrl}/current-user`);
  }

  isLoggedIn(){
    this.checkTokenExpiration();
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined ||  tokenStr == '' || tokenStr == null)
    {
      return false;
    }
    else{
      return true;
    }
  }
  // logout

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  
  checkTokenExpiration(){
    let jdateStr = localStorage.getItem("jdate")!;
    const lastLogin = new Date(jdateStr);
    const newTime = new Date(lastLogin.getTime() + (10 * 60 * 60 * 1000));
    const currentTime = new Date();
    let expiredTime = newTime.getHours();
    console.log(expiredTime, currentTime.getHours());
    if (expiredTime === currentTime.getHours())  {
      console.log("session expired");
      this.logout();
      this._snackBar.open('Session is expired please login again !!', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }
  // get user
  getToken()
  {
    this.checkTokenExpiration();
    return localStorage.getItem("token");
  }
  
  // set user detail
  setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
    return true;
  }

  // get useer
  getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  // get user role
  // getUserRole(){
  //   let user = this.getUser();
  //   return user.authorities[0].authority;
  // }

  // Educator Registration

  addMember(member:any){
    return this.http.post(`${this.baseUrl}/educator/add`,member)
  }

  // getAllMember(){
  //   return this.http.get(`${this.baseUrl}/educator/`);
  // }

  getMemberByEmail(email:any){
    return this.http.get(`${this.baseUrl}/educator/update/`+email);
  }

  updatePassword(userData:any){
    return this.http.put(`${this.baseUrl}/educator/update/password`,userData);
  }

  updateProfile(userData:any){
    return this.http.put(`${this.baseUrl}/educator/update`,userData);
  }
  
  deleteUser(id:number){
    return this.http.delete(`${this.baseUrl}/educator/`+ id);
  }

  getActiveEducator(){
    return this.http.get(`${this.baseUrl}/educator/active`);
  }

}
