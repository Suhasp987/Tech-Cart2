import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:3002/";

    constructor(private http: HttpClient) { }
    postfitnessdata(data:any){
      return this.http.post<any>(`${UserService.BaseUrl}appointment`, data, httpOptions);
    }
    getfitnessdata() {
      return this.http.get<any>(`${UserService.BaseUrl}appointment`, httpOptions);
    }
    
    postQuery(data:any){
      return this.http.post<any>(`${UserService.BaseUrl}query`,data,httpOptions);
    }
    getQuery() {
      return this.http.get<any>(`${UserService.BaseUrl}query`, httpOptions);
    }
    // add more methods as per requirements
    getAppointmentById(appointmentId: number) {
      const url = `${UserService.BaseUrl}appointment/${appointmentId}`;
      return this.http.get<any>(url, httpOptions)
    }

    deleteAppointmentById(appointmentId: number) {
      const url = `${UserService.BaseUrl}appointment/${appointmentId}`;
      return this.http.delete<any>(url, httpOptions)
      
    }
    updateAppointment(appointmentId: number, updatedData: any) {
      const url = `${UserService.BaseUrl}appointment/${appointmentId}`;
      return this.http.put<any>(url, updatedData, httpOptions)
      
    }

}