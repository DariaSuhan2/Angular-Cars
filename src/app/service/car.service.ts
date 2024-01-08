import { Injectable } from '@angular/core';
import { ICar} from "../models/car";
import {Observable, of, catchError, tap, throwError} from 'rxjs';
import { MessageService } from '../service-message/message.service';
import { HttpClient, HttpErrorResponse,  HttpHeaders  } from '@angular/common/http';
import { ICarCategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  //private _carUrl = 'api/cars/cars.json';
  private _carUrl = 'http://localhost:5120/api/car';
  //private _categoryUrl = 'http://localhost:5120/api/category';
  //private _carUrl = 'http://local.mydomain.example:5120/api/car';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  // getCategories(): Observable<ICarCategory[]> {
  //   return this._http.get<ICarCategory[]>(this._categoryUrl).pipe(
  //     tap(data => console.log('All', JSON.stringify(data))),
  //     catchError(err => this.handleError(err))
  //     );
  // }
      
  updateCar(car: ICar): Observable<any> {
        return this._http.put(this._carUrl, car, this.httpOptions).pipe(
          tap(_ => console.log(`updated car vin=${car.vin}`)),
          catchError(err => this.handleError(err))
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

  addCar(car: ICar) : Observable<ICar> {
    //return of(car);
    debugger;
    return this._http.post<ICar>(this._carUrl, car, this.httpOptions).pipe(
      tap((newCar:ICar) => console.log(`added car w/ vin=${newCar.vin}`)),
      catchError(err => this.handleError(err))
    );

  }

 
  deleteCar(vin: number): Observable<ICar> {
    const url = `${this._carUrl}/${vin}`;
    return this._http.delete<ICar>(url).pipe(
    tap(_ => console.log(`deleted car vin=${vin}`)),
    catchError(err => this.handleError(err))
  );
}
  
  
}

