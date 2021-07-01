import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormsModule,ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/shared/models/UserRegistration.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  exportAs: 'form'
})
export class RegistrationFormComponent implements OnInit {
  form: FormGroup;
  user:UserRegistration=new UserRegistration;
  terms:boolean;
  rejected:boolean;
  constructor(public service: UserService,private router: Router,private fb: FormBuilder ) {

  }

   ngOnInit()
   {
      this.form = new FormGroup
      ({
        fullname: new FormControl('',[Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
        dateOfBirth: new FormControl('',[Validators.required]),
        terms: new FormControl('',[Validators.required]),
      },this.matchPasswords);
   }

   matchPasswords(fg:FormGroup):Validators
   {
     return fg.get('password').value === fg.get('confirmPassword').value ? null :
     {notmatched:true};
   }

   changed(status: boolean, control: string ){

    switch(control) {
        case 'terms': {
           this.terms = status
            break;
        }
        default: {
            break;
        }
    }
    if(this.terms){
      this.rejected = true;
    }else{
      this.rejected = false;
    }


  }

  get fullname(){
     return this.form.get('fullname') as FormControl;
  }
  get email(){
     return this.form.get('email') as FormControl;
  }
  get password(){
     return this.form.get('password') as FormControl;
  }
  get confirmPassword(){
     return this.form.get('confirmPassword') as FormControl;
  }
  get dateOfBirth(){
     return this.form.get('dateOfBirth') as FormControl;
  }
   onSubmit(user:UserRegistration)
   {
     this.service.CreateUser(user).subscribe((creationStatus) => {
      this.resetForm(this.form);
     }, (error) => {
       console.log(error);
     });
   }
   resetForm(form:FormGroup)
   {
     form.reset;
     this.service.formData=new UserRegistration();
   }

}
