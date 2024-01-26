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
  //selectedCategory : string | null = null;
  selectedCars: ICar[] = [];
  cars: ICar[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  categories?: Array<ICarCategory>;
  //closeResult: string = "";
  from: string = '';
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

  update(car:ICar): void {
    // this.selectedCategory= car.category?.name || null;
    this._carService.getCategories().subscribe(categories => this.categories = categories);
    if (this.categories != null){
      const selectedCategory = this.categories.find(s => s.name == car?.category?.name);
      if (car!= null){
          car.category = selectedCategory != null ? selectedCategory : null;
   }}

    // this._carService.getCategories().subscribe(categories => this.categories = categories);
    // if (car.category?.name == this.categories){
    //   car.category?.engineCapacity =this.categories?.engineCapacity;
    // }
    
    const modalComponent = this.modalService.open(AddEditModalComponent, { size: 'xl', backdrop: 'static' });
  //  this.cars.category?.name = 
    modalComponent.componentInstance.car = car;
   // this._carService.getCategories().subscribe(categories => this.categories = categories);
    // const cat = this.categories.filter(c => c = car.category?.name);
    // modalComponent.componentInstance.category = car.category?.name;
    //  modalComponent.componentInstance.engineCapacity = car.category?.engineCapacity;
    //  modalComponent.componentInstance.weight = car.category?.weight;
    modalComponent.componentInstance.from = 'update';
    modalComponent.result.then((result) => {
      this._carService.getCars();
     });

     
  }

 

  add(): void {
    const modalComponent = this.modalService.open(AddEditModalComponent, { size: 'xl', backdrop: 'static' });
    modalComponent.componentInstance.from = 'add';
     modalComponent.result.then((result) => {
      this._carService.getCars();
      
     });
   
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
          debugger;
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
    
   }


  //    save(): void {
  //   if (this.car) {
  //     if (this.car.type == "Budget") {
  //       this.car.airConditioning = false;
  //       this.car.electricWindow = false;
  //       this.car.parkingSenzor = false;
  //       this.car.USBPort = false;
  //       this.car.parktronicSystem = false;
  //       this.car.infotainmentSystem = false;
  //       this.car.radio = RadioType.ANALOG;
  //     }
  //     else if (this.car.type == "Premium"){
  //       this.car.airConditioning = true;
  //       this.car.electricWindow = true;
  //       this.car.parkingSenzor = true;
  //       this.car.USBPort = true;
  //       this.car.parktronicSystem = false;
  //       this.car.infotainmentSystem = false;
  //       this.car.radio = RadioType.DIGITAL;
  //     }
  //     else if (this.car.type == "Luxury"){
  //       this.car.airConditioning = true;
  //       this.car.electricWindow = true;
  //       this.car.parkingSenzor = true;
  //       this.car.USBPort = true;
  //       this.car.parktronicSystem = true;
  //       this.car.infotainmentSystem = true;
  //       this.car.radio = RadioType.DIGITAL;
  //     }
  //     if (this.car.category != null) {
  //         this.car.category.name = this.selectedCategory;
  //       }
  //     this._carService.updateCar(this.car)
  //             .subscribe(() => this.goBack())

  //   }
  // }

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
