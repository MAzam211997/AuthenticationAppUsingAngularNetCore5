import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

import { ExporterService } from 'src/app/shared/services/exporter.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-export-to-pdf',
  templateUrl: './export-to-pdf.component.html',
  styleUrls: ['./export-to-pdf.component.css']
})
export class ExportToPDFComponent implements OnInit {
  exporterForm: any;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor(private exporter:ExporterService,private toastr: ToastrService) { }



  ngOnInit() {
    this.exporterForm = new FormGroup
      ({
        name: new FormControl('',[Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl('',[Validators.required]),
      });
  }
  title = 'html-to-pdf';

  public downloadAsPDF()
  {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    this.toastr.success('File has been downloaded as pdf successfully.', 'Download Successful !');
  }
  public downloadAsWord(element, filename='')
  {
    var preHtml = "< xmlns:o='urn:schemas-microsoft-com:office:office' xmlns='w=urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>  <head><meta charset='utf-8'><title>Export As Word Document</title></head>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;


    var blob =new Blob(['\ufeff', html],{type:'application/msword'});

    var url = 'data:application/vnd.ms-word; charset=utf-8,'+encodeURIComponent(html);
    filename=filename?filename+'.doc':'document.doc';
    var downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    if(navigator.msSaveOrOpenBlob)
    {
      navigator.msSaveOrOpenBlob(blob, filename);
    }
    else{
      downloadLink.href=url;
      downloadLink.download=filename;
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
    this.toastr.success('File has been downloaded as word successfully.', 'Download Successful !');
  }

  // generatePDF() {
  //   var data = document.getElementById('contentToConvert');
  //   html2canvas(data).then(canvas => {
  //     var imgWidth = 408;
  //     var imgHeight =canvas.height  * imgWidth / canvas.width;
  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jspdf('l', 'mm', 'a4');
  //     var position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //     pdf.save('PDF_Generated_File.pdf');
  //   });

  get name(){
    return this.exporterForm.get('name') as FormControl;
 }
 get email(){
    return this.exporterForm.get('email') as FormControl;
 }
 get address(){
    return this.exporterForm.get('address') as FormControl;
 }
    downloadPDF(data)
    {
      debugger
      JSON.stringify(data);
      this.exporter.downloadToPDF(data).subscribe((creationStatus) => {

       }, (error) => {
         console.log(error);
       });
    }
    downloadWord(data)
    {
      debugger
      this.exporter.downloadToWord(data).subscribe((creationStatus) => {

       }, (error) => {
         console.log(error);
       });
    }
  }



