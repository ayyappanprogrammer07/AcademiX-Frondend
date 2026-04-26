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

  public getStudentsDetails(data:any)
  {
    let baseurl =environment.baseUrl;
    let url =`${baseurl}academix/studentmanagement/GetStudentDetails`
    console.log(url);
    return this.httpclient.post<any[]>(url,data);
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

  public getcountnewmonth()
  {
    let baseurl =environment.baseUrl;
    let url =`${baseurl}academix/studentmanagement/getcountnewmonth`
    console.log(url);
    return this.httpclient.get<any>(url);
  }

  public isregnouniqueornot(regno:any)
  {
    let baseurl =environment.baseUrl;
    let url =`${baseurl}academix/studentmanagement/isregnouniqueornot?regno=${regno}`
    return this.httpclient.get<any>(url);
  }

  public updatestudentrecord(data:any):Observable<any>
  {
    let baseurl = environment.baseUrl;
    let url = `${baseurl}academix/studentmanagement/updatestudentrecord`
    console.log(url);
    return this.httpclient.post(url,data);
  }

  public deleteStudent(regno:any)
  {
     let baseurl = environment.baseUrl;
    let url = `${baseurl}academix/studentmanagement/Makestudentinactive?regno=${regno}`
    console.log(url);
    return this.httpclient.delete(url);
  }
}
