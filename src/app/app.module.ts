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
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminmainComponent,
    SidebarComponent,
    StaffmanagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule  ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
