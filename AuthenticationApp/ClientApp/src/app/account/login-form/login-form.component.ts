import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegistration } from 'src/app/shared/models/UserRegistration.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  isLoginError: boolean;
  form: FormGroup;
  model : any={};
  errorMessage: any;
  user:UserRegistration=new UserRegistration;
  constructor(private toastr: ToastrService,public service: UserService,private router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup
      ({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      });
  }
  login(){
    debugger;
    this.service.Login(this.model).subscribe(
      data => {
        debugger;

          this.router.navigate(['../dashboard']);
          debugger;
      },
      error => {
        this.toastr.error('Invalid email and/or password.', 'Invalid Input !');
        this.errorMessage = error.message;
      });
  }
  get email(){
    return this.form.get('email') as FormControl;
 }
 get password(){
    return this.form.get('password') as FormControl;
 }
}
