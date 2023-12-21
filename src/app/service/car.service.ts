import { Injectable } from '@angular/core';
import {CARS, ICar} from "../models/car";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  getCars(): Observable<ICar[]> {
    const cars = of(CARS);
    return cars;
  }
}
