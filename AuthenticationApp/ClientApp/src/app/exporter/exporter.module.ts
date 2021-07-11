import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportToPDFComponent } from './export-to-pdf/export-to-pdf.component';
import { ExportToWordComponent } from './export-to-word/export-to-word.component';



@NgModule({
  declarations: [ExportToPDFComponent, ExportToWordComponent],
  imports: [
    CommonModule
  ]
})
export class ExporterModule { }
