import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICar} from "../models/car";
import { CarService } from '../service/car.service';
import { MessageService } from '../service-message/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
  //providers: [CarService] - register service for one component and child components
})
export class CarsComponent implements OnInit, OnDestroy {
 
  selectedCar?: ICar;
  selectedCars: ICar[] = [];
  cars: ICar[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  constructor (private _carService: CarService, private _messageService: MessageService) {}
  
  ngOnInit(): void {
    //this.getCars();
    this.sub = this._carService.getCars().subscribe({
      next: cars => {
        this.cars = cars;
        this.selectedCars = this.cars;
        //debugger;
        
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(car: ICar): void {
    this.selectedCar = car;
    this._messageService.add(`CarsComponent: Selected car vin=${car.vin}`);
  }


  getCars(): void {
      this._carService.getCars().subscribe(cars => this.cars = cars);
  }

  


}
