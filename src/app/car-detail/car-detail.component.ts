import { Component, Input, OnInit } from '@angular/core';
//import {NgIf, UpperCasePipe} from '@angular/common';
//import {FormsModule} from '@angular/forms';
import {ICar} from "../models/car";
import { CarService } from '../service/car.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ICarCategory } from '../models/category';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {
  //car?: ICar;
  pageTitle: string = 'Car Details';
  car?: ICar;
  //Categories :  Observable<ICarCategory[]>;

  constructor(private _carService: CarService,
    private route: ActivatedRoute,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.getCar();
    //const categories = this._carService.getCategories();
    //if (categories == car.category.name)
  }

  getCar(): void {
    const vin = parseInt(this.route.snapshot.paramMap.get('vin')!, 10);
    if(vin != null){
      this._carService.getCar(vin)
      .subscribe(car => {
        this.car = car;
      });
    }
    
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.car) {
      this._carService.updateCar(this.car)
        .subscribe(() => this.goBack());
    }
  }


  // subscribe(
  //   result =>{ 
  //    console.log('success: ', result);
  //    this.router.navigate(['/cars']);
  //   },
  //   error => {
  //     console.log('error', error);
  //   }
  // );
   
}




