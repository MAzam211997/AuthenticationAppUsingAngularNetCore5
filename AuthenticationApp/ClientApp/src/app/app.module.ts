import { ExportToWordComponent } from './exporter/export-to-word/export-to-word.component';
import { ExportToPDFComponent } from './exporter/export-to-pdf/export-to-pdf.component';
import { ShowAnswersComponent } from './answers/show-answers/show-answers.component';
import { FormfieldsComponent } from './questions/formfields/formfields.component';
import { OptionsComponent } from './questions/options/options.component';
import { QuestionComponent } from './questions/question/question.component';
import { DocumentComponent } from './documenter/document/document.component';
import { EditUserComponent } from './dashboard/edit-user/edit-user.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { UserService } from './shared/services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { DocumenterModule } from './documenter/documenter.module';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { QuestionsService } from './shared/services/questions.service';
import { AnswersService } from './shared/services/answers.service';
//import { TooltipModule } from 'ng2-tooltip-directive/lib/tooltip.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    DashboardComponent,
    EditUserComponent,
    DocumentComponent,
    QuestionComponent,
    OptionsComponent,
    FormfieldsComponent,
    ShowAnswersComponent,
    ExportToPDFComponent,
    ExportToWordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DragDropModule,
    //TooltipModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
       { path: '', component: ShowAnswersComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'registration-form', component: RegistrationFormComponent },
      { path: 'login-form', component: LoginFormComponent },
      { path: 'edit-user', component: EditUserComponent },
      { path: 'document', component: DocumentComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'export-to-pdf', component: ExportToPDFComponent },
      { path: 'export-to-word', component: ExportToWordComponent },
      { path: 'show-answers', component: ShowAnswersComponent },


    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton:true,
      newestOnTop:true,
      progressBar:true,
      extendedTimeOut:300
    }),
    //DocumenterModule,
    DocumentEditorContainerAllModule
  ],
  providers: [UserService,QuestionsService,AnswersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
