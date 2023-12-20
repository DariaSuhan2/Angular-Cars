import {Component} from '@angular/core';
import {CARS, ICar} from "../models/car";
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  //cars = CARS;
  selectedCar?: ICar;
  cars: ICar[] = [];
  constructor (private carService: CarService) {}
  

  onSelect(car: ICar): void {
    this.selectedCar = car;
  }

  getCars(): void {
    this.cars = this.carService.getCars();
  }

  ngOnInit(): void {
    this.getCars();
  }
}
