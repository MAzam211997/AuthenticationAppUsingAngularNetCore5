import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from 'src/app/shared/models/UserRegistration.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userRegistrationList:UserRegistration[];
  editEnabled:boolean=false;
  form: FormGroup;
  userId:number;
  user:UserRegistration;
  constructor(public service: UserService) { }

  ngOnInit() {
    this.service.getAllUsers();
    this.form = new FormGroup
      ({
        email: new FormControl('', [Validators.required, Validators.email]),
        fullname: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
      });
  }
  onSubmit(userData:UserRegistration)
   {
     this.service.putUser(userData.userId,userData);
   }
  enableEditMode(user:UserRegistration)
  {
    this.userId=user.userId;
    this.editEnabled=true;
    this.user=user;
  }
  onDelete(id:number){
    if(confirm("Are you sure you want to delete the record ?"))
    {
      this.service.deleteUser(this.user.userId);
    }
  }

}
