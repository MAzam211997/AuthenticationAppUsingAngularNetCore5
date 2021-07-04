import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  public serviceLink: string;
  constructor() { }

  ngOnInit() {
    //Service URL is required for opening word documents in DocumentEditor
    //Documentation link: https://ej2.syncfusion.com/angular/documentation/document-editor/import/?no-cache=1#convert-word-documents-into-sfdt
    this.serviceLink = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
  }

}
