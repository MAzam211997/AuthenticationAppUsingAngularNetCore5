import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ExporterService {
  readonly baseURL='https://localhost:44326/api/Exporter/';
  data: any[];
  constructor(private http:HttpClient) { }

  // exportToPDF()
  // {
  //   this.http.get(this.baseURL+'').toPromise().then(result=>this.data=result as any[]);
  // }

  downloadToPDF()
  {
   this.http.get(this.baseURL+'Html_To_Pdf').toPromise().then(result=>this.data=result as any[]);
  }


  downloadToWord(details)
  {
    return this.http.post(this.baseURL+'ExportToWord', details);
  }
}
