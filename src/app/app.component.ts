import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    csalad: any;
  title = 'Csaladfa';
  private url = 'http://localhost:3000/csalad';

  constructor(private http:HttpClient, private api:ApiService) { }

  ngOnInit(){
    this.getCsalad();
  }

  getCsalad() {
    this.api.getCsalad().subscribe({
      next: (data) => {
        this.csalad = data.map((csalad:any) => ({
          ...csalad,
          editable: false
        }));
      },
    });
  }

  toggleEdit(csalad:any) {
    csalad.editable = !csalad.editable;
  }

  saveRow(csalad:any){
    if (csalad.id) {
      this.http.put(`${this.url}/${csalad.id}`, csalad).subscribe(() => {
        csalad.editable = false;
      });
    } else {
      this.http.post(this.url, csalad).subscribe(() => {
        csalad.editable = false;
        this.getCsalad();
      });
    }
  }

  deleteCsalad(rowId:any) {
    this.http.delete(`${this.url}/${rowId}`).subscribe(
      () => {
        this.getCsalad();
      }
    );
  }

  addRow() {
    const newRow = {
      nev: '',
      szuletesidatum: '',
      szuletesihely: '',
      anyjaneve: '',
      apjaneve: '',
      halalideje: '',
      halalhelye: '',
      editable: true
    };
    this.csalad.push(newRow);
  }
}
