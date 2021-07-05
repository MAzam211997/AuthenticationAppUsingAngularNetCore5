import { Options } from './../../shared/models/Options.model';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  constructor(private toastr: ToastrService,public service: QuestionsService) { }
  dynamicArray: Array<Options> = [];
  newDynamic: any = {};
  formFieldId:any;
  isOneOptionAdded:number=0;
  ngOnInit()
  {
    this.service.getAllFormFields();
    //this.newDynamic = {name: "", email: "",phone:""};
    this.dynamicArray.push(this.newDynamic);
  }

   fieldArray: Array<any> = [];
     newAttribute: any = {};

    addFieldValue() {
      this.isOneOptionAdded++;
        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};
    }

    deleteFieldValue(index)
    {
      this.isOneOptionAdded--;
        this.fieldArray.splice(index, 1);
    }


  onSelect(formfieldid)
  {
    this.formFieldId=formfieldid;
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
