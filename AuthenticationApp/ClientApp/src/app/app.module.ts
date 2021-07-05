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
    FormfieldsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DragDropModule,
    //TooltipModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
       { path: '', component: LoginFormComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'registration-form', component: RegistrationFormComponent },
      { path: 'login-form', component: LoginFormComponent },
      { path: 'edit-user', component: EditUserComponent },
      { path: 'document', component: DocumentComponent },
      { path: 'question', component: QuestionComponent },


    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    //DocumenterModule,
    DocumentEditorContainerAllModule
  ],
  providers: [UserService,QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
