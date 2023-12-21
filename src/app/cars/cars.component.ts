import {Component, OnInit} from '@angular/core';
import {CARS, ICar} from "../models/car";
import { CarService } from '../service/car.service';
import { MessageService } from '../service-message/message.service';



@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
  //providers: [CarService] - register service for one component and child components
})
export class CarsComponent implements OnInit {
 
  selectedCar?: ICar;
  cars: ICar[] = [];

  constructor (private _carService: CarService, private _messageService: MessageService) {}
  
  ngOnInit(): void {
    this.getCars();
  }

  onSelect(car: ICar): void {
    this.selectedCar = car;
    this._messageService.add(`CarsComponent: Selected car vin=${car.vin}`);
  }


  getCars(): void {
      this._carService.getCars().subscribe(cars => this.cars = cars);
  }

}
