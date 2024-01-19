import { Component, OnInit } from '@angular/core';
import FamilyTree from "@balkangraph/familytree.js";
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    csalad: any;
  title = 'Csaladfa';
  constructor(private api:ApiService) { }

  ngOnInit() {

    this.getCsalad();

    const tree = document.getElementById('tree');
    if (tree) {
        var family = new FamilyTree(tree, {
        enableSearch: false,
        mouseScrool: FamilyTree.action.none,
        scaleInitial: FamilyTree.match.boundary,
        nodeBinding: {
            field_0: "name"
        },
        min: true,
        editForm: {
            titleBinding: "name",
            generateElementsFromFields: false,
            elements: [
                { type: 'textbox', label: 'Teljes név', binding: 'name' },
    
                [
                    { type: 'date', label: 'Születési dátum', binding: 'birthDate' },
                    { type: 'textbox', label: 'Születés helye', binding: 'birthCity' }
                ],
                [
                    { type: 'date', label: 'Halál ideje', binding: 'deathDate' },
                    { type: 'textbox', label: 'Halál helye', binding: 'deathCity' }
                ],
            ],
            buttons: {
                edit: {
                    icon: FamilyTree.icon.edit(24, 24, '#fff'),
                    text: 'Edit',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false
                },
                share: null,
                pdf: null,
                remove: null
            }
        }
        });

          family.load([
              { id: 1, pids: [2], name: "Kovács János", gender: "male"},
              { id: 2, pids: [1], name: "Szabó Liliána", gender: "female"},
              { id: 3, pids: [6], mid: 1, fid: 2, name: "Kovács Tibor", gender: "male", birthDate: "1945-08-17", birthCity: "Székesfehérvár", deathDate: "2020-11-28", deathCity: "Szolnok"},
              { id: 4, pids: [5], name: "Tóth Károly", gender: "male" },
              { id: 5, pids: [4], name: "Balogh Katalin", gender: "female" },
              { id: 6, pids: [3], mid: 4, fid: 5, name: "Tóth Ilona", gender: "female", birthDate: "1947-07-10", birthCity: "Székesfehérvár", deathDate: "2022-03-30", deathCity: "Szolnok" },
              { id: 7, pids: [8], name: "Horváth Erzsébet", gender: "female" },
              { id: 8, pids: [7], name: "Kis Sándor", gender: "male" },
              { id: 9, pids: [12], mid: 7, fid: 8, name: "Kis Terézia", gender: "female", birthDate: "1945-11-15", birthCity: "Kecskemét", deathDate: "2019-05-10", deathCity: "Szolnok" },
              { id: 10, pids: [11], name: "Nagy Bálint", gender: "male" },
              { id: 11, pids: [10], name: "Molnár Róza", gender: "female" },
              { id: 12, pids: [9], mid: 10, fid: 11, name: "Nagy István", gender: "male", birthDate: "1943-02-11", birthCity: "Kecskemét", deathDate: "2021-09-03", deathCity: "Szolnok" },
              { id: 13, pids: [14], mid: 6, fid: 3, name: "Kovács Mária", gender: "female", birthDate: "1965-04-03", birthCity: "Szolnok" },
              { id: 14, pids: [13], mid: 9, fid: 12, name: "Nagy József", gender: "male", birthDate: "1963-01-25", birthCity: "Szolnok" },
              { id: 15, pids: [17], mid: 13, fid: 14, name: "Nagy Anna", gender: "female", birthDate: "1990-05-30", birthCity: "Budapest" },
              { id: 16, pids: [18], mid: 13, fid: 14, name: "Nagy Zsolt", gender: "male", birthdate: "1995-10-15", birthCity: "Budapest" },
              { id: 17, pids: [15], name: "Varga Gergely", gender: "male" },
              { id: 18, pids: [16], name: "Kováts Fruzsina", gender: "female" },
              { id: 19, mid: 15, fid: 17, name: "Varga Tamás", gender: "male", birthDate: "2013-08-10", birthCity: "Budapest" },
              { id: 20, mid: 16, fid: 18, name: "Nagy Kata", gender: "female", birthDate: "2019-09-01", birthCity: "Budapest" }
          ]);
      }
  }

  getCsalad(){
    this.api.getCsalad().subscribe({
        next: data => {
            this.csalad = data;
        }
    })
  }
}
