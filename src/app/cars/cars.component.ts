import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICar} from "../models/car";
import { CarService } from '../service/car.service';
import { MessageService } from '../service-message/message.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //selector: 'app-cars',
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

  constructor (private _carService: CarService, 
   // private _messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {}
  
  ngOnInit(): void {
    //this.getCars();
    this.sub = this._carService.getCars().subscribe({
      next: cars => {
        this.cars = cars;
        this.selectedCars = this.cars;  
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(car: ICar): void {
    this.selectedCar = car;
   // this._messageService.add(`CarsComponent: Selected car vin=${car.vin}`);
    this.router.navigate([`/car/details/${car.vin}`]);
    // router navigate to car/details/{car.vin}
  }


  getCars(): void {
      this._carService.getCars().subscribe(cars => this.cars = cars);
  }

  delete(car: ICar): void {
   this.cars = this.cars.filter(c => c !== car);
    if(car.vin != null){
      this._carService.deleteCar(car.vin).subscribe(
        result => {
            console.log('success: ', result);
            this.getCars();
        },
        error => {
          console.log('error', error);
          debugger;
        }
      );
    }
  }
  
  deleteAll(): void {
    //this._carService.deleteAll().subscribe();
    this._carService.deleteAllCars();
 
    window.location.reload();
    // this.router.navigate(['/cars']);
     this._carService.getCars();
    //this.redirectTo(['/cars']);
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/cars']);
    // });
   
  }

  // save(): void {
  //   if (this.car) {
  //     this._carService.updateCar(this.car)
  //       .subscribe(() => this.goBack());
  //   }
  // }
  

}
