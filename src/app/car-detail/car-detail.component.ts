import { Component, Input, OnInit, OnDestroy } from '@angular/core';
//import {NgIf, UpperCasePipe} from '@angular/common';
import {ICar, RadioType} from "../models/car";
import { CarService } from '../service/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ICarCategory } from '../models/category';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})

export class CarDetailComponent implements OnInit {

  car?: ICar;
  selectedCategory : string | null = null;
 
  constructor(private _carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {}

  ngOnInit(): void {
      this.getCar();
      // this._carService.getCategories().subscribe(categories => this.categories = categories);
      // this.types = ["Budget", "Premium", "Luxury"];
  }

  getCar(): void {
    const vin = parseInt(this.route.snapshot.paramMap.get('vin')!, 10);
    var na = Number.isNaN(vin);
    if(vin != null && !Number.isNaN(vin)){
    this._carService.getCar(vin)
      .subscribe(carFromServer => {
        this.car = carFromServer;
        this.selectedCategory= carFromServer.category?.name || null;
      });
    }
  }

  goBack(): void {
    //this.location.back();
    this.router.navigate([`/cars`]);
  }

}




