import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAnswersComponent } from './show-answers/show-answers.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@NgModule({
  declarations: [ShowAnswersComponent],
  imports: [
    CommonModule,FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule
  ]
})
export class AnswersModule { }
