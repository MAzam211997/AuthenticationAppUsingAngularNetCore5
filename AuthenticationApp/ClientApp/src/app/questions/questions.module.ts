import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { OptionsComponent } from './options/options.component';
import { FormfieldsComponent } from './formfields/formfields.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [QuestionComponent, OptionsComponent, FormfieldsComponent],
  imports: [
    CommonModule,FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule,DragDropModule
  ]
})
export class QuestionsModule { }
