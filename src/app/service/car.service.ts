import { Injectable } from '@angular/core';
import {CARS, ICar} from "../models/car";
import {Observable, of} from 'rxjs';
import { MessageService } from '../service-message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private messageService: MessageService) { }

  getCars(): Observable<ICar[]> {
    const cars = of(CARS);
    this.messageService.add('CarService: fetched cars');
    return cars;
  }
}
