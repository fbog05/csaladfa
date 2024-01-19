import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    csalad: any;
  title = 'Csaladfa';
  private apiUrl = 'http://localhost:3000/csalad';

  constructor(private http:HttpClient, private api:ApiService) { }

  ngOnInit(){
    this.getCsalad();
  }

  getCsalad(){
    this.api.getCsalad().subscribe({
      next: data => {
        this.csalad = data;
      }
    })
  }

  deleteCsalad(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
