import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {ICar} from "../models/car";
import { CarService } from '../service/car.service';
//import { MessageService } from '../service-message/message.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "../modal/modal.component";
import {AddEditModalComponent} from "../add-edit-modal/add-edit-modal.component";
import { ICarCategory } from '../models/category';

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
  categories?: Array<ICarCategory>;

  from: string = '';
  //const modal = this.modalService.open(ModalComponent);

  constructor (private _carService: CarService,
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
    this.router.navigate([`/car/details/${car.vin}`]);
  }

  update(car:ICar): void {
    this._carService.getCategories().subscribe(categories => this.categories = categories);
    if (this.categories != null){
      const selectedCategory = this.categories.find(s => s.name == car?.category?.name);
      if (car!= null){
          car.category = selectedCategory != null ? selectedCategory : null;
     }}
    const modalComponent = this.modalService.open(AddEditModalComponent, { size: 'xl', backdrop: 'static' });
    modalComponent.componentInstance.car = car;
    modalComponent.componentInstance.from = 'update';
    modalComponent.result.then((result) => {
      this._carService.getCars();
     });
    this._carService.getCars();
  }

  add(): void {
    const modalComponent = this.modalService.open(AddEditModalComponent, { size: 'xl', backdrop: 'static' });
    modalComponent.componentInstance.from = 'add';
    modalComponent.result.then((result) => {
      this._carService.getCars();
     });
    //  this._carService.getCars();
  }

  getCars(): void {
      this._carService.getCars().subscribe(cars => this.cars = cars);
  }

  // getCar(): void {
  //   const vin = parseInt(this.route.snapshot.paramMap.get('vin')!, 10);
  //   var na = Number.isNaN(vin);
  //   if(vin != null && !Number.isNaN(vin)){
  //   this._carService.getCar(vin)
  //     .subscribe(carFromServer => {
  //       this.selectedCar = carFromServer;
  //       this.selectedCategory= carFromServer.category?.name || null;
  //     });
  //   }
  // }

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
        }
      );
       
    }
    const modalComponent = this.modalService.open(ModalComponent);
    modalComponent.componentInstance.car = car;
    modalComponent.componentInstance.from = 'deleteOne';
    // modalComponent.result.then((result) => {
    // this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    modalComponent.result.then((result) => {
      this._carService.getCars();
     });
  }

  deleteAll(): void {
    this._carService.deleteAllCars();   
     const modalComponent = this.modalService.open(ModalComponent);
     modalComponent.componentInstance.from = 'deleteAll';
     modalComponent.result.then((result) => {
      this._carService.getCars();
     });
   
     window.location.reload();
   }
}
