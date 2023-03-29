import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduloGuard implements CanActivate {
  constructor(private login:LoginService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.login.isLoggedIn() && this.login.getUserRole()=='SCHEDULO' || this.login.getUserRole()=='IBPO') {
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
  
}
