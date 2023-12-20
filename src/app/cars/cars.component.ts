import { Component } from '@angular/core';
import { Car } from '../car';
//import {CARS} from '../mock-cars';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe, NgFor, NgIf } from '@angular/common';
import { CARS } from '../mock-cars';


@Component({
 
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe
  ],
})
export class CarsComponent {
  cars = CARS;
  selectedCar?: Car; 

  onSelect(car:Car): void {
    this.selectedCar = car;
  }

 }
