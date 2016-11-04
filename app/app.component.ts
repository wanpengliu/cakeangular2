import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Cake } from './Cake';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular App</h1>
    
            <ul>
                <li *ngFor=" let cake of cakes">
               <p (click)=populateForm(cake)> {{cake.price}} {{cake.content}} </p>
                </li>
            </ul>
            <div *ngIf="selectedCake">
           <label>Cake Price </label> <input [(ngModel)]="selectedCake.price" > 
           <label>Cake Title </label> <input [(ngModel)]="selectedCake.title" > 
           <label>Cake Content </label> <input [(ngModel)]="selectedCake.content" > 
            <button (click)=updateCake(selectedCake)>Update</button>
            <button (click) = deleteCake()>Delete</button>
            </div>
    
    `
})
export class AppComponent implements OnInit {

    cakes: Cake[];
    selectedCake : Cake;
    constructor(private http: Http) { }

    getAllCakes() {
        this.http.get('http://localhost:8080/cakes')
            .toPromise().then(response => response.json() as Cake[])
            .then(cakes => this.cakes = cakes);
    }
    ngOnInit() {
        this.getAllCakes();
    }

    populateForm(cake: Cake) {
        this.selectedCake  = cake;
    }

    updateCake(cake : Cake) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        
        console.log("update selected cake with new price " + this.selectedCake.price );
        console.log(JSON.stringify(this.selectedCake));
        this.http.put("http://localhost:8080/updatecake/" + this.selectedCake.id, JSON.stringify(this.selectedCake), {headers})
        .toPromise().then(response => console.log(response.json()));
    }

    deleteCake(){

        this.http.delete("http://localhost:8080/deletecake/" + this.selectedCake.id)
        .toPromise().then(response => console.log(response));
        this.getAllCakes();
    }





}
