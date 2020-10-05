import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/core/core/service/base-http.service';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private baseHttp: BaseHttpService) { }
  private readonly URL = 'https://api.github.com/users';

  public getUser(name: string): Observable<any>{
    return this.baseHttp.get(`${this.URL}/`, `${name}`);
  }
}
