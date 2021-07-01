import { UserService } from 'src/app/shared/services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [DashboardComponent, EditUserComponent],
  imports: [
    CommonModule,FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule
  ]
  // ,
  // providers:[
  //   UserService
  // ]
})
export class DashboardModule { }
