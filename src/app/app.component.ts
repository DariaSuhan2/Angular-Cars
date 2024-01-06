import { Component } from '@angular/core';

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
        <li><a class='nav-link' routerLinkActive='active' routerLink='cars/delete:vin'>Delete a car</a></li>
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

  
}
