import {Component} from '@angular/core';
import {CARS, ICar} from "../models/car";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  cars = CARS;
  selectedCar?: ICar;
  

  onSelect(car: ICar): void {
    this.selectedCar = car;
  }
}
