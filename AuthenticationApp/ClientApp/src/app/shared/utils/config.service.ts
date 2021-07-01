import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  _apiURI : string;
 
  constructor() {
      this._apiURI = 'http://localhost:5000/api';
   }

   getApiURI() {
       return this._apiURI;
   }  
}
