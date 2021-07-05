import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRegistration } from '../models/UserRegistration.model';
import { BaseService } from './base.service';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  header: HttpHeaders;
  data: any[];
  progress: any;
  message: any;
  @Output() public onUploadFinished =new EventEmitter();
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

  public uploadFile=(files) =>
  {
    if(files.length === 0)
    return;
    let fileToUpload =<File>files[0];
    const formData=new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.http.post(this.baseURL+'UploadPicture/',formData,{reportProgress:true, observe: 'events'}).subscribe(event => {
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
  putUser(id,formData)
  {
    return this.http.put(this.baseURL+id,formData);
  }
  deleteUser(id)
  {
    alert(this.baseURL);
    return this.http.delete(this.baseURL+id);
  }
  getAllUsers(){
    this.http.get(this.baseURL).toPromise().then(result=>this.userRegistrationList=result as UserRegistration[]);
  }

  login(user:UserRegistration){
    return this.http.post(this.baseURL+ 'Login', user);
  }
  convertStringToDate(date) {
    return new Date(`${date.year}-${date.month}-${date.day}`);
  }
}
