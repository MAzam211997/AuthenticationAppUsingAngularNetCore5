import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import  jspdf from 'jspdf';

@Component({
  selector: 'app-export-to-pdf',
  templateUrl: './export-to-pdf.component.html',
  styleUrls: ['./export-to-pdf.component.css']
})
export class ExportToPDFComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  title = 'html-to-pdf';
  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 408;
      var imgHeight =canvas.height  * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('PDF_Generated_File.pdf');
    });
  }

}
