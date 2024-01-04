import { Component, OnInit } from '@angular/core';
import {ICar} from "../models/car";
import { ICarCategory } from "../models/category";
import {RadioType} from "../models/car";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {
  pageTitle: string = 'Add a car';
  addedCategory? :  ICarCategory;
  //radioType?: RadioType;
  
  addedCar : ICar = { 
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
    uSBPort: false,
    parktronicSystem: false,
    infotainmentSystem: false,
    radio: RadioType.DIGITAL,
    type: 'Premium'

  };

  constructor() { }

  ngOnInit() {
  }

}
