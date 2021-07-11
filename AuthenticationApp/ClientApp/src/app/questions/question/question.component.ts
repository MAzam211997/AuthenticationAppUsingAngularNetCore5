import { Questions } from './../../shared/models/Questions.model';
import { Options } from './../../shared/models/Options.model';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsDto } from 'src/app/shared/DTOs/QuestionsDto.model';
import { AnswersService } from 'src/app/shared/services/answers.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export  class QuestionComponent implements OnInit {
  form: FormGroup;
  constructor(private toastr: ToastrService,public questionsService: QuestionsService,public answersService: AnswersService) { }
  dynamicArray: Array<Options> = [];
  newDynamic: any = {};
  formFieldId:any;
  isOneOptionAdded:number=0;
  fieldArray: Array<QuestionsDto> = [];
  answersArray: Array<any> = [];
  newField: any = {};
  submittedAnswers: any = {};

  ngOnInit()
  {

    this.questionsService.getAllFormFields();
    this.questionsService.getAllQuestions();
    this.questionsService.getAllOptions();
    this.dynamicArray.push(this.newDynamic);
    this.form = new FormGroup
      ({
        questionAns: new FormControl('', [Validators.required]),
      });
  }

  onSubmitAnswers(submittedAnswers)
  {
    this.answersArray.push(submittedAnswers);
    this.submittedAnswers= {questionId:this.submittedAnswers.questionId, questionAns:this.form.value};
    debugger
    this.answersService.saveAnswers(this.answersArray).subscribe((creationStatus) => {
    this.toastr.success('Answer(s) has been submitted successfully.', 'Answers Submitted !');
   },
   (error) =>
   {
     console.log(error);
   });
  }
  tempArr: any = { "brands": [] };

    onChangeCategory(event, options: any){ // Use appropriate model type instead of any
     debugger
      //this.tempArr.brands.push(options.optionName);
      this.answersArray.push(options);
    }
onSubmit(question: any)
{
  if(this.formFieldId ==1)
  {
    this.newField = {optionText:'', description:this.newField.description,  questionType:this.newField.questionType, IsCorrect:this.newField.IsCorrect, formFieldId:this.newField.questionType};
    this.fieldArray.push(this.newField);
  }
  if(this.formFieldId > 1 && this.formFieldId != 0 )
    {
      this.isOneOptionAdded=1;
    }else {
      this.isOneOptionAdded=0;
    }
  debugger
  this.questionsService.addQuestion(question).subscribe((creationStatus) => {
    this.toastr.success('Question with provided option(s) has been created successfully.', 'Question Created !');
    //this.questionsService.getAllFormFields();
    this.questionsService.getAllQuestions();
    this.questionsService.getAllOptions();
    //this.newField = {optionText:'', description:'',  questionType:'', IsCorrect:''};
   }, (error) => {
     console.log(error);
   });
}


    addFieldValue()
    {

      this.isOneOptionAdded++;
      this.newField.formFieldId=this.formFieldId;
      this.fieldArray.push(this.newField);
      this.newField = {optionText:'', description:this.newField.description,  questionType:this.newField.questionType, IsCorrect:this.newField.IsCorrect, formFieldId:this.newField.questionType};
      if(this.formFieldId > 1 && this.formFieldId != 0 )
      {
        this.isOneOptionAdded=1;
      }
      else
      {
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
    this.fieldArray = [];
    this.formFieldId=formfieldid;
    if(this.formFieldId > 1 && this.isOneOptionAdded != 0 )
      {
        this.isOneOptionAdded=1;
      }
      else
      {
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
