import {Component} from '@angular/core';
import {CARS, ICar} from "../models/car";
import { CarService } from '../service/car.service';
import { map } from 'rxjs';



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
    this.carService.getCars().pipe(map(cars) => {this.cars = cars}));
    //this.carService.getCars().subscribe((cars) => {this.cars = cars});
    //this.carService.getCars().subscribe(cars => this.cars = cars);
  }


  ngOnInit(): void {
    this.getCars();
  }
}
