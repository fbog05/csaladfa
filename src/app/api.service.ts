import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  host = 'http://localhost:3000/'

  getCsalad(){
    let endpoint = 'csalad';
    let url = this.host + endpoint;

    return this.http.get<any>(url);
  }
}
