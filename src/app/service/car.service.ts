import { Injectable } from '@angular/core';
import { ICar} from "../models/car";
import {Observable, of, catchError, tap, throwError, map} from 'rxjs';
//import { MessageService } from '../service-message/message.service';
import { HttpClient, HttpErrorResponse,  HttpHeaders  } from '@angular/common/http';
import { ICarCategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  //private _carUrl = 'api/cars/cars.json';
  private _carUrl = 'http://localhost:55726/api/car';
  private _categoryUrl = 'http://localhost:55726/api/category';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http: HttpClient) { }

  getCars(): Observable<ICar[]> {
      return this._http.get<ICar[]>(this._carUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(err => this.handleError(err))
      );
  }

  getCar(vin: number): Observable<ICar> {
      if ((vin!= null) || (vin!= Number.isNaN) || (vin != undefined)){
        const url = `${this._carUrl}/${vin}`;
        return this._http.get<ICar>(url).pipe(
          tap(_ => console.log(`fetched car vin=${vin}`)),
          catchError(err => this.handleError(err))
        );
    } else {
      return of();
    }
  }

  updateCar(car: ICar): Observable<any> {
    const url = `${this._carUrl}/${car.vin}`;
        return this._http.put(url, car, this.httpOptions).pipe(
          tap(_ => console.log(`updated car vin=${car.vin}`)),
          catchError(err => this.handleError(err))
        );
  }

    addCar(car: ICar) : Observable<ICar> {
    return this._http.post<ICar>(this._carUrl, car, this.httpOptions).pipe(
      tap((newCar:ICar) => console.log(`added car`)),
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
  deleteAllCars():void{
    const url = `${this._carUrl}/delete-all`;
    this._http.delete(url).subscribe(
        data => console.log('deletedAll', JSON.stringify(data)),
        catchError(err => this.handleError(err))
        );
    // this._http.delete(url).pipe(
    //   tap(data => {console.log('deletedAll', JSON.stringify(data));
    //   }),
    //   catchError(err => this.handleError(err))
    //   );
  }

  getCategories(): Observable<ICarCategory[]> {
      return this._http.get<ICarCategory[]>(this._categoryUrl).pipe(
      tap(data => {console.log('All', JSON.stringify(data));
    }),
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

  // updateColorCar(car: ICar): Observable<any> {
  //   return this._http.patch(this._carUrl, car, this.httpOptions).pipe(
  //     tap(_ => console.log(`updated the color of car vin=${car.vin}`)),
  //     catchError(err => this.handleError(err))
  //   );
  // }



   // category1: ICarCategory  = {
  //   name : "SmallCar",
  //   engineCapacity : 2000,
  //   weight : 2
  // };
  // category2 : ICarCategory  = {
  //   name : "Bus",
  //   engineCapacity : 3000,
  //   weight : 2
  // };
  // category3 : ICarCategory  = {
  //   name : "Goodvehicle",
  //   engineCapacity : 5000,
  //   weight : 6
  // };

}

