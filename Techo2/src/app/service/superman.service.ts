import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const baseUrl = '/techapi';

let httpOptions = { headers: new HttpHeaders({
  "Content-Type": "application/json"
}) };

@Injectable({
  providedIn: 'root'
})
export class SupermanService {

  constructor(private httpClient: HttpClient) { }

  postSerice(reqObj:any){
    return this.httpClient.post<any>(baseUrl,reqObj,httpOptions)
  }

  getService(data:any){
    return this.httpClient.get<any>(baseUrl,data)
  }
}
