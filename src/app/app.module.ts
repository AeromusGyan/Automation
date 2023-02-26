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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AddCoursesComponent,
    CoursesSortPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MasterModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    RouterModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule
    
    
    ],
  providers: [authInterceptorProviders, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
