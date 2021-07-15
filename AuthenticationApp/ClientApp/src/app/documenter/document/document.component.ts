import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  public serviceLink: string;
  public Editor = ClassicEditor;


  // public Editor1 = DecoupledEditor;

  // public onReady( editor ) {
  //     editor.ui.getEditableElement().parentElement.insertBefore(
  //         editor.ui.view.toolbar.element,
  //         editor.ui.getEditableElement()
  //     );
  // }
  constructor() { }

  ngOnInit() {

    ClassicEditor
	.create( document.querySelector( '#editor' ) )
	.then( editor => {
		//window.editor = editor;
	} )
	.catch( error => {
		console.error( 'There was a problem initializing the editor.', error );
	} );
    //Service URL is required for opening word documents in DocumentEditor
    //Documentation link: https://ej2.syncfusion.com/angular/documentation/document-editor/import/?no-cache=1#convert-word-documents-into-sfdt
    this.serviceLink = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
  }

}
