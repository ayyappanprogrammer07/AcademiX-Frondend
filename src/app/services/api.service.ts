import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient :HttpClient) { }

  public is_userexist(data:any):Observable<any>
  {
    let baseUrl = environment.baseUrl;
    let url = `${baseUrl}academix/login`
    console.log(url)
    return this.httpclient.post(url,data);
  }
}
