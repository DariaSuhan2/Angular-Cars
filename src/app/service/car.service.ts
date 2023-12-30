import { Injectable } from '@angular/core';
import { ICar} from "../models/car";
import {Observable, of, catchError, tap, throwError} from 'rxjs';
import { MessageService } from '../service-message/message.service';
import { HttpClient, HttpErrorResponse,  HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  //private _carUrl = 'api/cars/cars.json';
  private _carUrl = 'http://localhost:5120/api/car';
  //private _carUrl = 'http://local.mydomain.example:5120/api/car';
  //private _carUrl = 'http:// 127.0.0.1';

  constructor(private _http: HttpClient, private messageService: MessageService) { }

  getCars(): Observable<ICar[]> {
    //const cars = of(CARS);
    this.messageService.add('CarService: fetched cars');
    //return cars;
    return this._http.get<ICar[]>(this._carUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(err => this.handleError(err))
      );
    }

  getCar(vin: number): Observable<ICar> {
        const url = `${this._carUrl}/${vin}`;
        return this._http.get<ICar>(url).pipe(
          tap(_ => console.log(`fetched car vin=${vin}`)),
          catchError(err => this.handleError(err))
        );
      }  
      
  /*updateCar(Car: ICar): Observable<any> {
        return this._http.put(this._carUrl, Car, this.httpOptions).pipe(
          tap(_ => console.log(`updated car vin=${Car.vin}`)),
          catchError(err => this.handleError(err))
        );
      }   */
    
 
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

