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
  // originalCar : ICar = { 
  //   vin: null,
  //   color: null,
  //   brand: null,
  //   doorNr: null,
  //   category: this.addedCategory = {
  //     name : null,
  //     engineCapacity : null,
  //     weight : null
  //   },
  //   airConditioning: null,
  //   electricWindow: null,
  //   parkingSenzor: null,
  //   USBPort: null,
  //   parktronicSystem: null,
  //   infotainmentSystem: null,
  //   radio: null,
  //   type: null

  // };  
  
  
   
    
   
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
  subscriptionCategories = Observable<ICarCategory[]>;

  category1  = {
    name : "SmallCar",
    engineCapacity : 2000,
    weight : 2
  };
  category2  = {
    name : "Bus",
    engineCapacity : 3000,
    weight : 2
  };
  category3  = {
    name : "Goodvehicle",
    engineCapacity : 5000,
    weight : 6
  };
  
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
      const categories = this._carService.getCategories();
      //const categories =[this.category1, this.category2, this.category3];
      
      const selectedCategory = categories.find(s => s.name == this.addedCategory);
        this.addedCar.category = selectedCategory != null ? selectedCategory : null;
       
      
      // if (this.addedCar.category != undefined) {
      //   // this.addedCar.category. = selectedCategory?.weight != null ? selectedCategory.weight : null;
      //   this.addedCar.category.engineCapacity = selectedCategory?.engineCapacity != null ? selectedCategory.engineCapacity : null;
      //   this.addedCar.category.weight = selectedCategory?.weight != null ? selectedCategory.weight : null;
      // }
      
    }
    // if (this.addedCar.category?.name == "SmallCar"){
    //   this.addedCar.category.engineCapacity = 2000;
    //   this.addedCar.category.weight = 2;
    // }
    // else if (this.addedCar.category?.name ==  "Bus") {
    //    this.addedCar.category.engineCapacity = 3000;
    //    this.addedCar.category.weight = 2;
    // }
    // else if (this.addedCar.category?.name =="Goodvehicle") {
    //   this.addedCar.category.engineCapacity = 5000;
    //   this.addedCar.category.weight = 6;
    // }
   
    this._carService.addCar(this.addedCar).subscribe(
      result =>{ 
       console.log('success: ', result);
       this.router.navigate(['/cars']);
      },
      error => {
        console.log('error', error);
      }
    );
    //const win: Window = window;
    //win.location = "http://localhost:4200/cars";
    //window.location.assign( "http://localhost:5120/api/car");
  
  }

}
