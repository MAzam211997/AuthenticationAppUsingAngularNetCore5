import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  public serviceLink: string;
  ngOnInit() {
    //Service URL is required for opening word documents in DocumentEditor
    //Documentation link: https://ej2.syncfusion.com/angular/documentation/document-editor/import/?no-cache=1#convert-word-documents-into-sfdt
    this.serviceLink = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
  }
}
