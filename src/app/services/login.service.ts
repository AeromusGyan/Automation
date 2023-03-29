import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,) { }

  private baseUrl: string = environment.baseUrl;

  // generate token
  generateToken(logindata: any) {
    return this.http.post(`${this.baseUrl}/token`, logindata);
  }
  // Login user set token in local storage

  loginUser(token: any) {
    localStorage.setItem("token", token);
    var lastLoginTime = new Date();
    localStorage.setItem("lastLoginTime", lastLoginTime.toString());
  }

  // get Current user details

  getCurrentUser() {
    return this.http.get(`${this.baseUrl}/current-user`);
  }

  isLoggedIn() {
    this.checkTokenExpiration();
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }
  // logout

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  checkTokenExpiration() {
    const token = localStorage.getItem('token');
    const lastLoginTime = localStorage.getItem('lastLoginTime');

    // Check if the token and last login time exist in localStorage
    if (token && lastLoginTime) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(lastLoginTime).getTime() + 10 * 60 * 60 * 1000; // 10 hours in milliseconds
      // console.log(lastLoginTime, expirationTime, currentTime);

      // Check if the current time is greater than the expiration time
      if (currentTime > expirationTime) {
        localStorage.removeItem('token'); // Remove the token from localStorage
        localStorage.removeItem('lastLoginTime'); // Remove the last login time from localStorage
        // Redirect the user to the logout page or show them a message that they have been logged out
        this.logout();
        this._snackBar.open('Session is expired please login again !!', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    }
  }
  // get user
  getToken() {
    this.checkTokenExpiration();
    return localStorage.getItem("token");
  }

  // set user detail
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  // get useer
  getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  // get user role
  getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  // Educator Registration

  addMember(member: any) {
    return this.http.post(`${this.baseUrl}/educator/add`, member)
  }

  // getAllMember(){
  //   return this.http.get(`${this.baseUrl}/educator/`);
  // }

  getMemberByEmail(email: any) {
    return this.http.get(`${this.baseUrl}/educator/update/` + email);
  }

  updatePassword(userData: any) {
    return this.http.put(`${this.baseUrl}/educator/update/password`, userData);
  }

  updateProfile(userData: any) {
    return this.http.put(`${this.baseUrl}/educator/update`, userData);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/educator/` + id);
  }

  getActiveEducator() {
    return this.http.get(`${this.baseUrl}/educator/active`);
  }

}
