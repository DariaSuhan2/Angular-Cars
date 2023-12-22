import { Injectable } from '@angular/core';
import {CARS, ICar} from "../models/car";
import {Observable, of, catchError, tap, throwError} from 'rxjs';
import { MessageService } from '../service-message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  //private _carUrl = 'api/cars/cars.json';
  private _carUrl = 'http://localhost:5120/api/car';


  constructor(private _http: HttpClient, private messageService: MessageService) { }

  getCars(): Observable<ICar[]> {
    //const cars = of(CARS);
    this.messageService.add('CarService: fetched cars');
    //return cars;
    return this._http.get<ICar[]>(this._carUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
      );
    
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);

  }
}

