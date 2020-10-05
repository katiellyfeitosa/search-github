import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(private http: HttpClient) { }

  get(URL: string, endpoint: string): Observable<any>{
   return this.http.get<any>(`${URL}${endpoint}`);
  }
}
