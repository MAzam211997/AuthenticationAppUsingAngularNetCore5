import { Questions } from '../models/Questions.model';
import { Options } from './../models/Options.model';
export class OptionsDto {
  optionId: number=0;
  description: string="";
  optionText: string="";
  isCorrect: boolean=false;
  formFieldId: number=0;
  questionId: number=0;
  question:Questions;
  options: Options;
  option: Options[] = [];
  questions: Questions[] = [];
  questionAns: any="";
  ddlAns: any="";
  radioAns:any="";
  isChecked: boolean=false;
  questionAnsChk: any="";
}
