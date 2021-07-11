import { Options } from './../models/Options.model';
import { FormFields } from './../models/FormFields.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questions } from '../models/Questions.model';
import { OptionsDto } from '../DTOs/OptionsDto.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService
{
  readonly baseURL='https://localhost:44326/api/Questions/';
  formData:Questions=new Questions();
  questionsList:OptionsDto[];
  optionsList:OptionsDto[];
  formFieldsList:FormFields[];

  constructor(private http:HttpClient, private router: Router)
  {

  }
  addQuestion(question:any)
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
    this.http.get(this.baseURL).toPromise().then(result=>this.questionsList=result as OptionsDto[]);
  }

  getAllFormFields()
  {
    this.http.get(this.baseURL+'GetAllFormFields').toPromise().then(result=>this.formFieldsList=result as FormFields[]);
  }

  getAllOptions()
  {
    this.http.get(this.baseURL+'GetAllOptionsWithQuestions').toPromise().then(result=>this.optionsList=result as OptionsDto[]);
  }
}
