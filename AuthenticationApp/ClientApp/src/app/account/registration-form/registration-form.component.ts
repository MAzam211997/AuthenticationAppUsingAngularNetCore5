import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormsModule,ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
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
  progress: any;
  message: any;
  thumb$: Observable<string>;
  @Output() public onUploadFinished =new EventEmitter();
  fileToUpload: File;
  imageUrl: any;
  @ViewChild('file', {
    static: true
}) file;
  constructor(private toastr: ToastrService,public service: UserService,private router: Router,private fb: FormBuilder, private http:HttpClient ) {

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

   onSelectFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.user.pictureName = event.target.result;
        //alert(this.user.pictureName);
    }
    reader.readAsDataURL(this.fileToUpload);
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
     //this.uploadFile(user.files);
     this.service.CreateUser(user).subscribe((creationStatus) => {
      this.toastr.success('Account has been created successfully.', 'Congratulations !');
      this.resetForm(this.form);
     }, (error) => {
       console.log(error);
     });
   }
   public uploadFile=(files) => {
    if(files.length === 0)
    return;
    debugger
    let fileToUpload =<File>files[0];
    const formData=new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.onSelectFile(files);
    this.http.post("https://localhost:44326/api/Users/"+'UploadPicture/',formData,{reportProgress:true, observe: 'events'}).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress)
      {
        this.progress=Math.round(100 * event.loaded / event.total);
      }
      else if(event.type === HttpEventType.Response)
      {
          this.message="Picture uploaded successfully.";
          this.onUploadFinished.emit(event.body as any);
      }
    });
  }
   resetForm(form:FormGroup)
   {
     form.reset;
     this.service.formData=new UserRegistration();
   }

}
