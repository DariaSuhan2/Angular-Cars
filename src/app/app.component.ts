import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
    <header>
    <h1>Logo</h1>
    <p>Some additional information here</p>
  </header>
  <nav class='navbar navbar-expand navbar-light bg-light'>
      <a class='navbar-brand'>{{title}}</a>
      <ul class='nav nav-pills'>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/welcome'>Home</a></li>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/cars'>Car List</a></li>
        
      </ul>
  </nav>
  
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  <footer>
  <p>2024</p>
  <p><a href="mailto:hege@example.com">Email</a></p>
  </footer>
  `,
   styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Cars';

  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  // <li><a class='nav-link' routerLinkActive='active' routerLink='car/add'>Car Add</a></li>
}
