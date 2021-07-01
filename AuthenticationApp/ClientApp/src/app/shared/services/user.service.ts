
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRegistration } from '../models/UserRegistration.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  header: HttpHeaders;
  data: any[];
  constructor(private http:HttpClient, private router: Router) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }
  readonly baseURL='https://localhost:44326/api/Users/';
  formData:UserRegistration=new UserRegistration();
  userRegistrationList:UserRegistration[];
  CreateUser(register:UserRegistration)
  {
   return this.http.post(this.baseURL, register);
  }

  putUser(id,formData)
  {
    //debugger
   //alert(users.userId);
    return this.http.put(this.baseURL+id,formData);
  }
  deleteUser(id)
  {
    return this.http.delete(this.baseURL+id);
  }
  getAllUsers(){
    this.http.get(this.baseURL).toPromise().then(result=>this.userRegistrationList=result as UserRegistration[]);
  }

  Login(user:UserRegistration){
    return this.http.post(this.baseURL+ 'Login', user);
  }

}
