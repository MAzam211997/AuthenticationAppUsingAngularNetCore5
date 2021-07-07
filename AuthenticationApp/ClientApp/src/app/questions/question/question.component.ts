import { Questions } from './../../shared/models/Questions.model';
import { Options } from './../../shared/models/Options.model';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsDto } from 'src/app/shared/DTOs/QuestionsDto.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  form: FormGroup;
  constructor(private toastr: ToastrService,public service: QuestionsService) { }
  dynamicArray: Array<Options> = [];
  newDynamic: any = {};
  formFieldId:any;
  isOneOptionAdded:number=0;
  fieldArray: Array<QuestionsDto> = [];
     newField: any = {};

  ngOnInit()
  {
    this.service.getAllFormFields();
    this.service.getAllQuestions();
    this.service.getAllOptions();
    this.dynamicArray.push(this.newDynamic);
    // this.form = new FormGroup
    //   ({
    //     question: new FormControl('',[Validators.required]),
    //     questionType: new FormControl('', [Validators.required]),
    //     correctAnswer: new FormControl('',[Validators.required]),
    //   });
  }

onSubmit(question: any)
{
  this.newField = {optionText:'', description:this.newField.description,  questionType:this.newField.questionType, IsCorrect:this.newField.IsCorrect, formFieldId:this.formFieldId};
  this.fieldArray.push(this.newField);
  if(this.formFieldId != 1 && this.formFieldId != 0)
    {
      this.isOneOptionAdded=1;
    }else {
      this.isOneOptionAdded=0;
    }
  debugger
  this.service.addQuestion(question).subscribe((creationStatus) => {
    this.toastr.success('Question with provided option(s) has been created successfully.', 'Question Created !');
    //this.service.getAllFormFields();
    this.service.getAllQuestions();
    this.service.getAllOptions();
    this.newField = {optionText:'', description:'',  questionType:'', IsCorrect:'', formFieldId:''};
   }, (error) => {
     console.log(error);
   });
}


    addFieldValue()
    {
      debugger
      this.isOneOptionAdded++;
      // if(this.fieldArray.length == 1)
      // {
        this.fieldArray.push(this.newField);
      this.newField = {optionText:'', description:this.newField.description,  questionType:this.newField.questionType, IsCorrect:this.newField.IsCorrect, formFieldId:this.newField.questionType};
      // }
      // else{

      // this.newField = {optionText:'', description:this.newField.description,  questionType:this.newField.questionType, IsCorrect:this.newField.IsCorrect, formFieldId:this.newField.questionType};
      // this.fieldArray.push(this.newField);
      // }
      if(this.formFieldId != 1 && this.formFieldId != 0)
    {
      this.isOneOptionAdded=1;
    }else {
      this.isOneOptionAdded=0;
    }
    }

    deleteFieldValue(index)
    {
      this.isOneOptionAdded--;
        this.fieldArray.splice(index, 1);
    }


  onSelect(formfieldid)
  {
    this.formFieldId=formfieldid;
    if(this.formFieldId != 1 && this.formFieldId != 0)
    {
      this.isOneOptionAdded=1;
    }else {
      this.isOneOptionAdded=0;
    }
  }
  addRow()
  {
    this.newDynamic = {name: "", email: "",phone:""};
    this.dynamicArray.push(this.newDynamic);
      //this.toastr.success('New row added successfully', 'New Row');
      //console.log(this.dynamicArray);
    return true;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.fieldArray, event.previousIndex, event.currentIndex);
  }

  MoviesList = [
    'The Far Side of the World',
    'Morituri',
    'Napoleon Dynamite',
    'Pulp Fiction',
    'Blade Runner',
    'Cool Hand Luke',
    'Heat',
    'Juice'
  ];

  MoviesWatched = [
  ];

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  deleteRow(index)
  {
      if(this.dynamicArray.length ==1)
      {
        //this.toastr.error("Can't delete the row when there is only one row", 'Warning');
          return false;
      }
      else
      {
          this.dynamicArray.splice(index, 1);
          //this.toastr.warning('Row deleted successfully', 'Delete row');
          return true;
      }
  }
}
