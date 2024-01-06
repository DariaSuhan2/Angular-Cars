import { Component, OnInit } from '@angular/core';
import {ICar} from "../models/car";
import { ICarCategory } from "../models/category";
import {RadioType} from "../models/car";
import { NgForm, NgModel } from '@angular/forms';
import { CarService } from '../service/car.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {
  pageTitle: string = 'Add a car';
  addedCategory? :  ICarCategory;

  constructor(private _carService: CarService,
    private router: Router
    ) {}
  
  //radioType?: RadioType;
  
  //originalCar? : ICar; 
  originalCar : ICar = { 
    vin: null,
    color: null,
    brand: null,
    doorNr: null,
    category: this.addedCategory = {
      name : null,
      engineCapacity :null,
      weight : null
    },
    airConditioning: null,
    electricWindow: null,
    parkingSenzor: null,
    USBPort: null,
    parktronicSystem: null,
    infotainmentSystem: null,
    radio: null,
    type: null

  }; 
  
  /*originalCar : ICar = { 
    vin: 10,
    color: 'red',
    brand: 'Opel',
    doorNr: 4,
    category: this.addedCategory = {
      name : 'SmallCar',
      engineCapacity :2000,
      weight : 2
    },
    airConditioning: true,
    electricWindow: true,
    parkingSenzor: true,
    USBPort: false,
    parktronicSystem: false,
    infotainmentSystem: false,
    radio: RadioType.DIGITAL,
    type: 'Premium'

  };*/

  addedCar : ICar = {...this.originalCar};
  
  
  //spread syntax in js - copy of orginal object and stored it in an object
  //alternative Lodash - deep clone function

  // constructor(private _carService: CarService
  //   ) { }
 

  ngOnInit() {
  
  }

  onBlur(field: NgModel){
    console.log('in onBlur: ', field.valid);
  }
 

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    if (this.addedCar.type = "Budget") {
      this.addedCar.airConditioning = false;
      this.addedCar.electricWindow = false;
      this.addedCar.parkingSenzor = false;
      this.addedCar.USBPort = false;
      this.addedCar.parktronicSystem = false;
      this.addedCar.infotainmentSystem = false;
      this.addedCar.radio = RadioType.ANALOG;
    } 
    else if (this.addedCar.type = "Premium"){
      this.addedCar.airConditioning = true;
      this.addedCar.electricWindow = true;
      this.addedCar.parkingSenzor = true;
      this.addedCar.USBPort = true;
      this.addedCar.parktronicSystem = false;
      this.addedCar.infotainmentSystem = false;
      this.addedCar.radio = RadioType.DIGITAL;
    }
    else if (this.addedCar.type = "Luxury"){
      this.addedCar.airConditioning = true;
      this.addedCar.electricWindow = true;
      this.addedCar.parkingSenzor = true;
      this.addedCar.USBPort = true;
      this.addedCar.parktronicSystem = true;
      this.addedCar.infotainmentSystem = true;
      this.addedCar.radio = RadioType.DIGITAL;
   }
   
  //this.originalCar.category?.name
  if (this.addedCar.category = { "name": "SmallCar", "engineCapacity": null, "weight": null }) {
    this.addedCar.category.name = "SmallCar";
    this.addedCar.category.engineCapacity = 2000;
    this.addedCar.category.weight = 2;
  }
  else if (this.addedCar.category = { "name": "Bus", "engineCapacity": null, "weight": null }) {
    this.addedCar.category.name = "Bus";
    this.addedCar.category.engineCapacity = 3000;
    this.addedCar.category.weight = 2;
  }
  else if (this.addedCar.category = { "name": "Goodvehicle", "engineCapacity": null, "weight": null }) {
    this.addedCar.category.name = "Goodvehicle";
    this.addedCar.category.engineCapacity = 5000;
    this.addedCar.category.weight = 6;
  }

    
    this._carService.addCar(this.addedCar).subscribe(
      result => console.log('success: ', result),
      error => console.log('error', error)
    );
    //const win: Window = window;
    //win.location = "http://localhost:4200/cars";
    //window.location.assign( "http://localhost:5120/api/car");
    this.router.navigate(['/cars']);
    
   
  }

}