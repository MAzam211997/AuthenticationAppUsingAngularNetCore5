import { FormFields } from './../models/FormFields.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questions } from '../models/Questions.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService
{
  readonly baseURL='https://localhost:44326/api/Questions/';
  formData:Questions=new Questions();
  questionsList:Questions[];
  formFieldsList:FormFields[];

  constructor(private http:HttpClient, private router: Router)
  {

  }

  addQuestion(question:Questions)
  {
   return this.http.post(this.baseURL, question);
  }

  editQuestion(id,formData)
  {
    return this.http.put(this.baseURL+id,formData);
  }

  deleteQuestion(id)
  {
    return this.http.delete(this.baseURL+id);
  }

  getAllQuestions()
  {
    this.http.get(this.baseURL).toPromise().then(result=>this.questionsList=result as Questions[]);
  }

  getAllFormFields()
  {
    this.http.get(this.baseURL+'GetAllFormFields').toPromise().then(result=>this.formFieldsList=result as FormFields[]);
  }
}
