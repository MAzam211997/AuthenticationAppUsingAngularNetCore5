import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { OptionsComponent } from './options/options.component';
import { FormfieldsComponent } from './formfields/formfields.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



@NgModule({
  declarations: [QuestionComponent, OptionsComponent, FormfieldsComponent],
  imports: [
    CommonModule,FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule
  ]
})
export class QuestionsModule { }
