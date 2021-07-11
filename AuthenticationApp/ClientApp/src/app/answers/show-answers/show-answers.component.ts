import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnswersService } from 'src/app/shared/services/answers.service';

@Component({
  selector: 'app-show-answers',
  templateUrl: './show-answers.component.html',
  styleUrls: ['./show-answers.component.css']
})
export class ShowAnswersComponent implements OnInit {
  form: FormGroup;

  constructor(private toastr: ToastrService,public answersService: AnswersService) { }

  ngOnInit() {
    this.answersService.getAllAnswersWithQuestions();
    this.form = new FormGroup
    ({
      fullname: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      dateOfBirth: new FormControl('',[Validators.required]),
      terms: new FormControl('',[Validators.required]),
    });
  }

}
