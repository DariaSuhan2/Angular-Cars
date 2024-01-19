import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICar} from "../models/car";
import { CarService } from '../service/car.service';
//import { MessageService } from '../service-message/message.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "../modal/modal.component";

@Component({
  //selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
  //providers: [CarService] - register service for one component and child components
})
export class CarsComponent implements OnInit, OnDestroy {

  selectedCar?: ICar;
  selectedCars: ICar[] = [];
  cars: ICar[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  closeResult: string = "";
  //const modal = this.modalService.open(ModalComponent);

  constructor (private _carService: CarService,
   // private _messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public modalService: NgbModal) {}

  ngOnInit(): void {
    this.sub = this._carService.getCars().subscribe((cars) => {
        this.cars = cars;
        this.selectedCars = this.cars;
      },
        error => {
          console.log('error', error);
        }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(car: ICar): void {
    this.selectedCar = car;
   // this._messageService.add(`CarsComponent: Selected car vin=${car.vin}`);
    this.router.navigate([`/car/details/${car.vin}`]);
  }

//   openModal() {
//
//   }


  getCars(): void {
      this._carService.getCars().subscribe(cars => this.cars = cars);
  }

  delete(car: ICar): void {
   this.cars = this.cars.filter(c => c !== car);
    if(car.vin != null){
      this._carService.deleteCar(car.vin).subscribe(
        result => {
            console.log('success: ', result);
            this.getCars();
        },
        error => {
          console.log('error', error);
          debugger;
        }
      );
       
    }
    const modalComponent = this.modalService.open(ModalComponent);
     //modalComponent.componentInstance.car = car;
    // modalComponent.result.then((result) => {
    // this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
   
  }

  deleteAll(): void {
    this._carService.deleteAllCars();
    window.location.reload();
     this._carService.getCars();
   }

  //  private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }

  // }
}
