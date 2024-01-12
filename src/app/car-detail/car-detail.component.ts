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
  
  //addedCategory? :  string;
  
  
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
     
      this._carService.updateCar(this.car)
        .subscribe(() => this.goBack());

      // this._carService.getCategories().subscribe(
      //   result =>{ 
      //     console.log('success: ', result);
      //     const selectedCategory = result.find(s => s.name == this.addedCategory);
      //     if (this.car != null) {
      //       this.car.category = selectedCategory != null ? selectedCategory : null;
          
      //       this._carService.updateCar(this.car).subscribe(
      //         result =>{ 
      //          console.log('success: ', result);
      //         },
      //         error => {
      //           console.log('error', error);
      //         }
      //       );
      //     }},
      //     error => {
      //        console.log('error', error);
      //     }
      // );

      // this._carService.updateCar(this.car)
      //   .subscribe(
      //     result =>{ 
      //       console.log('success: ', result);
      //       const selectedCategory = result.find(s => s.name == this.addedCategory);
      //       this.car?.category= selectedCategory != null ? selectedCategory : null;
      //       this._carService.addCar(this.car).subscribe(
      //         result =>{ 
      //          console.log('success: ', result);
      //          //this.router.navigate(['/cars']);
      //         },
      //         error => {
      //           console.log('error', error);
      //         }
      //       );
      //      },
      //      error => {
      //        console.log('error', error);
      //      }
      //   );
          
          
      //     () => this.goBack());





        
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




