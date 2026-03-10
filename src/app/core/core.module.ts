import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { FormsModule } from '@angular/forms';
import { StudentmanagementComponent } from '../studentmanagement/studentmanagement.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CoreComponent,
    StudentmanagementComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
