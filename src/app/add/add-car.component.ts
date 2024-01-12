import { Component, OnInit } from '@angular/core';
import {ICar} from "../models/car";
import { ICarCategory } from "../models/category";
import {RadioType} from "../models/car";
import { NgForm, NgModel } from '@angular/forms';
import { CarService } from '../service/car.service';
import { Observable, find } from 'rxjs';
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
  addedCategory? :  string;

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
    category: null,
    airConditioning: null,
    electricWindow: null,
    parkingSenzor: null,
    USBPort: null,
    parktronicSystem: null,
    infotainmentSystem: null,
    radio: null,
    type: null

  };  
 

  addedCar : ICar = {...this.originalCar};
  subscriptionCategories = Observable<ICarCategory[]>;


  //spread syntax in js - copy of orginal object and stored it in an object
  //alternative Lodash - deep clone function

  // constructor(private _carService: CarService
  //   ) { }
 

  ngOnInit() {
    //this.subscriptionCategories = this._carService.getCategories();
  }

  onBlur(field: NgModel){
    console.log('in onBlur: ', field.valid);
  }


  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    if (this.addedCar.vin){ 
      let vinn: number = + this.addedCar.vin ;
      this.addedCar.vin = vinn;
    }
    if (this.addedCar.doorNr){ 
      let nr: number = + this.addedCar.doorNr ;
      this.addedCar.doorNr = nr;
    }
    // let vinn = parseInt(this.addedCar, 10) 
    // this.addedCar.vin = vinn;

    if (this.addedCar.type == "Budget") {
      this.addedCar.airConditioning = false;
      this.addedCar.electricWindow = false;
      this.addedCar.parkingSenzor = false;
      this.addedCar.USBPort = false;
      this.addedCar.parktronicSystem = false;
      this.addedCar.infotainmentSystem = false;
      this.addedCar.radio = RadioType.ANALOG;
    } 
    else if (this.addedCar.type == "Premium"){
      this.addedCar.airConditioning = true;
      this.addedCar.electricWindow = true;
      this.addedCar.parkingSenzor = true;
      this.addedCar.USBPort = true;
      this.addedCar.parktronicSystem = false;
      this.addedCar.infotainmentSystem = false;
      this.addedCar.radio = RadioType.DIGITAL;
    }
    else if (this.addedCar.type == "Luxury"){
      this.addedCar.airConditioning = true;
      this.addedCar.electricWindow = true;
      this.addedCar.parkingSenzor = true;
      this.addedCar.USBPort = true;
      this.addedCar.parktronicSystem = true;
      this.addedCar.infotainmentSystem = true;
      this.addedCar.radio = RadioType.DIGITAL;
   }
  

    if(this.addedCategory != null){
      this._carService.getCategories().subscribe(
        result =>{ 
          console.log('success: ', result);
          const selectedCategory = result.find(s => s.name == this.addedCategory);
          this.addedCar.category = selectedCategory != null ? selectedCategory : null;
          this._carService.addCar(this.addedCar).subscribe(
            result =>{ 
             console.log('success: ', result);
             return this.addedCategory;
             this.router.navigate(['/cars']);
            },
            error => {
              console.log('error', error);
            }
          );
         },
         error => {
           console.log('error', error);
         }
      );
     
    }
    //const win: Window = window;
    //win.location = "http://localhost:4200/cars";
    //window.location.assign( "http://localhost:5120/api/car");
  
  }

}
