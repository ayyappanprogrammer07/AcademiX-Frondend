import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { LoginComponent } from '../login/login.component';
import { AdminmainComponent } from '../admin/adminmain/adminmain.component';
import { StudentmanagementComponent } from '../admin/studentmanagement/studentmanagement.component'; 
import { StaffmanagementComponent } from '../admin/staffmanagement/staffmanagement.component';
import { TransportmanagementComponent } from '../admin/transportmanagement/transportmanagement.component';
import { LibrarymanagementComponent } from '../admin/librarymanagement/librarymanagement.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { DepartmentandhodmanagementComponent } from '../admin/departmentandhodmanagement/departmentandhodmanagement.component';
import { ClassandsectionmanagementComponent } from '../admin/classandsectionmanagement/classandsectionmanagement.component';
import { TimetablemanagementComponent } from '../admin/timetablemanagement/timetablemanagement.component';
import { AttendacemanagementComponent } from '../admin/attendacemanagement/attendacemanagement.component';
import { ExamandmarksmanagementComponent } from '../admin/examandmarksmanagement/examandmarksmanagement.component';
import { FeemanagementComponent } from '../admin/feemanagement/feemanagement.component';
import { ParentmanagementComponent } from '../admin/parentmanagement/parentmanagement.component';
import { HostelmanagementComponent } from '../admin/hostelmanagement/hostelmanagement.component';
import { NoticeboardmanagementComponent } from '../admin/noticeboardmanagement/noticeboardmanagement.component';
import { EventmanagementComponent } from '../admin/eventmanagement/eventmanagement.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'adminmain',
        component: AdminmainComponent,
        children: [
          {path:'',component:DashboardComponent},
          {path:'dashboard',component:DashboardComponent},
          { path: 'studentmanagement', component: StudentmanagementComponent },
          // add more child routes here later
          { path: 'staff', component: StaffmanagementComponent },
           {path:'transport',component:TransportmanagementComponent},
           {path:'library',component:LibrarymanagementComponent},
           {path:'departmentsandhods',component:DepartmentandhodmanagementComponent},
           {path:'classesandsection',component:ClassandsectionmanagementComponent},
           {path:'timetable',component:TimetablemanagementComponent},
           {path:'attendance',component:AttendacemanagementComponent},
           {path:'examsandmarks',component:ExamandmarksmanagementComponent},

            {path:'fees',component:FeemanagementComponent},
            {path:'parents',component:ParentmanagementComponent},
            {path:'hostel',component:HostelmanagementComponent},
            {path:'notices',component:NoticeboardmanagementComponent},
            {path:'events',component:EventmanagementComponent}
          // { path: 'fees', component: FeesComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
