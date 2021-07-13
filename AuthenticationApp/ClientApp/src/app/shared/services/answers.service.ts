import { FormFields } from '../models/FormFields.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questions } from '../models/Questions.model';
import { OptionsDto } from '../DTOs/OptionsDto.model';

@Injectable({
  providedIn: 'root'
})
export class AnswersService
{

  readonly baseURL='https://localhost:44326/api/SubmittedAnswers/';
  formData:Questions=new Questions();
  answersList:OptionsDto[];
  optionsList:OptionsDto[];
  formFieldsList:FormFields[];

  constructor(private http:HttpClient, private router: Router)
  {

  }

  saveAnswers(answers:any)
  {
    return this.http.post(this.baseURL, answers);
  }

  editAnswers(id,formData)
  {
    return this.http.put(this.baseURL+id,formData);
  }

  deleteAnswers(id)
  {
    return this.http.delete(this.baseURL+id);
  }

  getAllAnswers()
  {
    this.http.get(this.baseURL).toPromise().then(result=>this.answersList=result as OptionsDto[]);
  }
  getAllAnswersWithQuestions() {
    this.http.get(this.baseURL+'GetQuestionAnswers').toPromise().then(result=>this.answersList=result as OptionsDto[]);
  }
}
