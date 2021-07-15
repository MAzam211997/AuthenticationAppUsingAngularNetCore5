import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportToPDFComponent } from './export-to-pdf/export-to-pdf.component';
import { ExportToWordComponent } from './export-to-word/export-to-word.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ExportToPDFComponent, ExportToWordComponent, FileManagerComponent, UploadComponent, DownloadComponent],
  imports: [
    CommonModule,FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule,RouterModule
  ]
})
export class ExporterModule { }
