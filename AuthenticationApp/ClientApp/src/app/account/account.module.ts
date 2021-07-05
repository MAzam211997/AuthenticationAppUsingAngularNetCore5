import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [RegistrationFormComponent, LoginFormComponent, ProfileComponent],
  imports: [
    CommonModule,FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule
  ],
  providers:[

  ]
})
export class AccountModule { }
