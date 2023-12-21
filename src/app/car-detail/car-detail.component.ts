import { Component, Input } from '@angular/core';
//import {NgIf, UpperCasePipe} from '@angular/common';
//import {FormsModule} from '@angular/forms';
import {ICar} from "../models/car";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent {
  //car?: ICar;
  @Input() car?: ICar;
}
