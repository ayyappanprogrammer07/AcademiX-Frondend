import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminmainComponent } from './admin/adminmain/adminmain.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StaffmanagementComponent } from './admin/staffmanagement/staffmanagement.component';
import { TransportmanagementComponent } from './admin/transportmanagement/transportmanagement.component';
import { LibrarymanagementComponent } from './admin/librarymanagement/librarymanagement.component';
import { EventmanagementComponent } from './admin/eventmanagement/eventmanagement.component';
import { NoticeboardmanagementComponent } from './admin/noticeboardmanagement/noticeboardmanagement.component';
import { ParentmanagementComponent } from './admin/parentmanagement/parentmanagement.component';
import { HostelmanagementComponent } from './admin/hostelmanagement/hostelmanagement.component';
import { FeemanagementComponent } from './admin/feemanagement/feemanagement.component';
import { ExamandmarksmanagementComponent } from './admin/examandmarksmanagement/examandmarksmanagement.component';
import { AttendacemanagementComponent } from './admin/attendacemanagement/attendacemanagement.component';
import { TimetablemanagementComponent } from './admin/timetablemanagement/timetablemanagement.component';
import { ClassandsectionmanagementComponent } from './admin/classandsectionmanagement/classandsectionmanagement.component';
import { DepartmentandhodmanagementComponent } from './admin/departmentandhodmanagement/departmentandhodmanagement.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminmainComponent,
    SidebarComponent,
    StaffmanagementComponent,
    TransportmanagementComponent,
    LibrarymanagementComponent,
    EventmanagementComponent,
    NoticeboardmanagementComponent,
    ParentmanagementComponent,
    HostelmanagementComponent,
    FeemanagementComponent,
    ExamandmarksmanagementComponent,
    AttendacemanagementComponent,
    TimetablemanagementComponent,
    ClassandsectionmanagementComponent,
    DepartmentandhodmanagementComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule  ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: true
    }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
