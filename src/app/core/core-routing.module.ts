import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { LoginComponent } from '../login/login.component';
import { AdminmainComponent } from '../admin/adminmain/adminmain.component';
import { StudentmanagementComponent } from '../admin/studentmanagement/studentmanagement.component'; 

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
          { path: 'studentmanagement', component: StudentmanagementComponent },
          // add more child routes here later
          // { path: 'staff', component: StaffComponent },
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
