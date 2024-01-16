import { Component, Input, OnInit } from '@angular/core';
//import {NgIf, UpperCasePipe} from '@angular/common';
//import {FormsModule} from '@angular/forms';
import {ICar, RadioType} from "../models/car";
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
  rad = null;
  selectedCategory : string | null = null;
  categories?: Array<ICarCategory>;
  types?: Array<string>;

  constructor(private _carService: CarService,
    private route: ActivatedRoute,
    private location: Location
    ) {}

  ngOnInit(): void {
     this.getCar();
     this._carService.getCategories().subscribe(categories => this.categories = categories);
     this.types = ["Budget", "Premium", "Luxury"];
  }

  getCar(): void {
    const vin = parseInt(this.route.snapshot.paramMap.get('vin')!, 10);
    if(vin != null){
      this._carService.getCar(vin)
      .subscribe(carFromServer => {
        this.car = carFromServer;
        this.selectedCategory= carFromServer.category?.name || null;
      });
    }    
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.car) {
      if (this.car.type == "Budget") {
        this.car.airConditioning = false;
        this.car.electricWindow = false;
        this.car.parkingSenzor = false;
        this.car.USBPort = false;
        this.car.parktronicSystem = false;
        this.car.infotainmentSystem = false;
        this.car.radio = RadioType.ANALOG;
      } 
      else if (this.car.type == "Premium"){
        this.car.airConditioning = true;
        this.car.electricWindow = true;
        this.car.parkingSenzor = true;
        this.car.USBPort = true;
        this.car.parktronicSystem = false;
        this.car.infotainmentSystem = false;
        this.car.radio = RadioType.DIGITAL;
      }
      else if (this.car.type == "Luxury"){
        this.car.airConditioning = true;
        this.car.electricWindow = true;
        this.car.parkingSenzor = true;
        this.car.USBPort = true;
        this.car.parktronicSystem = true;
        this.car.infotainmentSystem = true;
        this.car.radio = RadioType.DIGITAL;
      }
      if (this.car.category != null) {
          this.car.category.name = this.selectedCategory;
        }
     
      this._carService.updateCar(this.car)
        .subscribe(() => this.goBack())
 
    }
  }
}




