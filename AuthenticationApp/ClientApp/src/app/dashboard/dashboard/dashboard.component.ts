import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegistration } from 'src/app/shared/models/UserRegistration.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRegistrationList:UserRegistration[];
  editEnabled:boolean=false;
  form: FormGroup;
  userId:number;
  user:UserRegistration;
  data: any[];
  rowNumber:number;
  constructor(private toastr: ToastrService,public service: UserService) { }

  ngOnInit() {
    this.service.getAllUsers();
    this.form = new FormGroup
      ({
        email: new FormControl('', [Validators.required, Validators.email]),
        fullname: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
        //userId: new FormControl('', [Validators.required]),
      });
  }
  onSubmit(data:UserRegistration)
   {
    this.rowNumber=0;
     this.service.putUser(this.userId,data).subscribe((user: UserRegistration) => {
      data = user;
      this.toastr.info('User has been updated successfully.', 'Update Confirmation !');
      this.editEnabled=false;
      this.service.getAllUsers();
     // alert(data);
    });
   }
  enableEditMode(user:UserRegistration)
  {
    this.rowNumber=user.userId;
    this.userId=user.userId;
    this.editEnabled=true;
    this.user=user;
    //this.service.getAllUsers();
  }
  onDelete(id){
    if(confirm("Are you sure you want to delete the record ?"))
    {

      this.service.deleteUser(id).subscribe((data: any[]) => {
        this.data = data;
        this.toastr.error('User has been deleted successfully.', 'Delete Confirmation !');
        this.editEnabled=false;
        this.service.getAllUsers();
      });
    }
  }
}
