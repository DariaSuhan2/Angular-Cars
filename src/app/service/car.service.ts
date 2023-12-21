import { Injectable } from '@angular/core';
import {CARS, ICar} from "../models/car";
import {Observable, of, catchError, tap} from 'rxjs';
import { MessageService } from '../service-message/message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private _productUrl = 'api/cars/cars.json';

  constructor(private _http: HttpClient, private messageService: MessageService) { }

  getCars(): Observable<ICar[]> {
    //const cars = of(CARS);
    this.messageService.add('CarService: fetched cars');
    //return cars;
    return this._http.get<ICar[]>(this._productUrl)
  }
}
