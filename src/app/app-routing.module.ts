import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AddCoursesComponent } from './pages/add-courses/add-courses.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ReportComponent } from './pages/report/report.component';
import { AdminGuard } from './auth/admin.guard';
import { ScheduloGuard } from './auth/schedulo.guard';
const routes: Routes = [
  // {path:'', redirectTo:'login'},
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'add-courses', component:AddCoursesComponent, canActivate:[AuthGuard]},
  {path:'upload', component:UploadComponent, canActivate:[AdminGuard]},
  {path:'report', component:ReportComponent, canActivate:[ScheduloGuard]},
  {path:'**',redirectTo:'/dashboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
