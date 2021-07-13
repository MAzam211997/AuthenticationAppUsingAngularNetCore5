import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GenericCRUDService<T> {
  protected readonly apiUrl = `${this.baseUrl}/${this.entityname}`;
  dataList: any[];
  constructor(
    protected readonly http: HttpClient,
    protected readonly entityname: string,
    protected readonly baseUrl: string = environment.BASE_API
  ) {}

  fetchEntities(subUrl: any, query?: { [key: string]: string }): Observable<T[]> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get<T[]>(this.apiUrl+subUrl, { params });
  }

  getAll(subUrl: any,dataList: any[])
  {
    debugger
    this.http.get(this.apiUrl+subUrl).toPromise().then(result=>this.dataList=result as any[]);
  }
  createEntity(body: T,subUrl: any): Observable<T> {
    return this.http.post<T>(this.apiUrl+subUrl, body);
  }

  fetchEntity(id: number): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.get<T>(url);
  }

  updateEntity(id: number, body: T): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.put<T>(url, body);
  }

  deleteEntity(id: number): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.delete<T>(url);
  }

  protected entityUrl(id: number): string {
    return [this.apiUrl, id].join('/');
  }
}
