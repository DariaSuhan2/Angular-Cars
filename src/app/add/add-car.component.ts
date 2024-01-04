import { Component, OnInit } from '@angular/core';
import {ICar} from "../models/car";
import { ICarCategory } from "../models/category";
import {RadioType} from "../models/car";
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {
  pageTitle: string = 'Add a car';
  addedCategory? :  ICarCategory;
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

  constructor() { }

  ngOnInit() {
  }

  onBlur(field: NgModel){
    console.log('in onBlur: ', field.valid);
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
  }

}
