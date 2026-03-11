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

  public addstudent(data:any):Observable<any>
  {
    let baseurl = environment.baseUrl;
    let url = `${baseurl}academix/studentmanagement/InsertStudent`
    console.log(url);
    return this.httpclient.post(url,data);
  }

  public getStudentsDetails()
  {
    let baseurl =environment.baseUrl;
    let url =`${baseurl}academix/studentmanagement/GetStudentDetails`
    console.log(url);
    return this.httpclient.get<any[]>(url);
  }

  public getcourse()
  {
    let baseUrl =environment.baseUrl;
    let url =`${baseUrl}academix/studentmanagement/GetCourses`
    console.log(url);
    return this.httpclient.get<any[]>(url);
  }

  public getDepartments(courseid:any)
  {
    let baseurl =environment.baseUrl;
    let url =`${baseurl}academix/studentmanagement/GetDepartments?courseid=${courseid}`
    console.log(url);
    return this.httpclient.get<any[]>(url);
  }

  public GetTotalStudentsCount()
  {
    let baseurl =environment.baseUrl;
    let url =`${baseurl}academix/studentmanagement/GetTotalStudentsCount`
    console.log(url);
    return this.httpclient.get<any[]>(url);
  }
  
  public activestudentscount()
  {
    let baseUrl =environment.baseUrl;
    let url =`${baseUrl}academix/studentmanagement/GetTotalActiveStudentsCount`
    console.log(url)
    return this.httpclient.get<any[]>(url);
  }

  public GetTotalBoysandGirlscount()
  {
    let baseurl =environment.baseUrl;
    let url =`${baseurl}academix/studentmanagement/GetTotalBoysandGirlscount`
    console.log(url);
    return this.httpclient.get<any>(url);
  }
}
