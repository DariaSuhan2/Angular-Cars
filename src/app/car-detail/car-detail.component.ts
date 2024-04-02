import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
  formattedDateC?: string;
  formattedDateU?: string;
  a?: any;
 
  constructor(private _carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {}

  ngOnInit(): void {
      this.getCar();     
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

        if(this.car?.createdOn != null ){
          const timeC= this.car.createdOn;
          const timeU = this.car.updatedOn;
          //const formattedDate = moment(timeNow).format('MMMM Do YYYY, h:mm:ss a');
          this.formattedDateC = moment(timeC).format('MMMM Do YYYY');
          this.formattedDateU = moment(timeU).format('MMMM Do YYYY');    
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate([`/cars`]);
  }
}




