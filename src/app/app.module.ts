import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MasterModule } from './master/master.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AddCoursesComponent } from './pages/add-courses/add-courses.component';
import { CoursesSortPipe } from './pipes/courses-sort.pipe';
import { DatePipe } from '@angular/common';
import { UpdateComponent } from './pages/dashboard/update/update.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ReportComponent } from './pages/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AddCoursesComponent,
    CoursesSortPipe,
    UpdateComponent,
    UploadComponent,
    ReportComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MasterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ],
  providers: [authInterceptorProviders, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
