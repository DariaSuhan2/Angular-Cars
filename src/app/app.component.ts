import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
      <a class='navbar-brand'>{{title}}</a>
      <ul class='nav nav-pills'>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/welcome'>Home</a></li>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/cars'>Car List</a></li>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/cars/add'>Add a car</a></li>
      </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `,
  //styleUrls: ['./app.component.css']
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Cars';

  

  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same 
    // bindValue in most of the place. 
    // You can also override bindValue for the specified template 
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';
}
}
