import { Component, Input, OnInit, OnDestroy } from '@angular/core';
//import {NgIf, UpperCasePipe} from '@angular/common';
import {ICar, RadioType} from "../models/car";
import { CarService } from '../service/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ICarCategory } from '../models/category';
import { Moment } from 'moment';
import moment from 'moment';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})

export class CarDetailComponent implements OnInit {

  car?: ICar;
  selectedCategory : string | null = null;
  radioo?: string;
  fuell?: string;
  formattedDate?: Moment;

 
  constructor(private _carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {}

  ngOnInit(): void {
      this.getCar();
      // this._carService.getCategories().subscribe(categories => this.categories = categories);
      // this.types = ["Budget", "Premium", "Luxury"];
      if(this.car?.createdOn != null ){
        
        const timeNow= this.car.createdOn ;
        const formattedDate = timeNow.format('dddd, MMMM Do YYYY');
        //const formattedDate = timeNow.format('MMMM Do YYYY');
        //const formattedDate = moment(timeNow).format('YYYY-MM-DD');
       
      }
      
  }

  getCar(): void {
    const vin = parseInt(this.route.snapshot.paramMap.get('vin')!, 10);
    var na = Number.isNaN(vin);
    if(vin != null && !Number.isNaN(vin)){
    this._carService.getCar(vin)
      .subscribe(carFromServer => {
        this.car = carFromServer;
        this.selectedCategory= carFromServer.category?.name || null;
        if (this.car.radio==0) {
          this.radioo = 'analog';
        } 
        else if (this.car.radio==1)
        { this.radioo = 'digital';}
        if (this.car.fuel==0) {
          this.fuell = 'gasoline';
        } 
        else if (this.car.fuel==1)
        { this.fuell = 'diesel';}
        else if (this.car.fuel==2)
        { this.fuell = 'hybrid';}

      });
    }
  

  }

  goBack(): void {
    //this.location.back();
    this.router.navigate([`/cars`]);
  }

}




