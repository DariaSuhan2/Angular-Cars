import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ICar, RadioType, Fuel } from '../models/car';
import { CarService } from '../service/car.service';
import { Observable } from 'rxjs/internal/Observable';
import { ICarCategory } from '../models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { NgSelectConfig } from '@ng-select/ng-select';
import  { Fuels } from '../models/IdName';
import { IModalOutput } from '../models/IModalOutput';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.css',
})


export class AddEditModalComponent implements OnInit{


  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal, 
    private _carService: CarService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ngSelectConfig: NgSelectConfig,
     ) {this.ngSelectConfig.appendTo = '';
  }

  @Input() car?: ICar;
  @Input() from: string = '';
  @Input() category?: ICarCategory;
  selectedCategory : string | null = null;
  selectedCars: ICar[] = [];
  cars: ICar[] = [];
  x: any;
  y: any;
  z: any;
  zz: any;
  selectedFuel?: Fuels | null;
  addedCategory?: string;
  subscriptionCategories = Observable<ICarCategory[]>;
  types?: Array<string>;
  fuels? : Array<Fuels>;
  fuelss?: Array<string>;
  categories?: Array<ICarCategory>;
  addedCar?: ICar;

  modalOutput = {closeStatus: false} as IModalOutput;

  carForm = this.fb.nonNullable.group({
    vin:  [0, Validators.compose([Validators.min(0), Validators.required])],
    color: ['', Validators.required],
    brand: ['', Validators.required],
    doorNr: [0, Validators.compose([Validators.min(0), Validators.required])],
    category: this.fb.nonNullable.group({
      name: [null, Validators.required],
      engineCapacity: [0, Validators.min(0)],
      weight:[0, Validators.min(0)],
    }),
    airConditioning: <boolean | null>null,
    electricWindow: <boolean | null>null,
    parkingSenzor: <boolean | null>null,
    USBPort: <boolean | null>null,
    parktronicSystem: <boolean | null>null,
    infotainmentSystem: <boolean | null>null,
    radio: <RadioType | null>null,
    type: [null, Validators.required],
    fuel: [null, Validators.required],
    createdOn: [null],
    updatedOn: [null]
    
    }
  );

  ngOnInit(): void {
    this.selectedFuel = new Fuels (null);
     this.fuels = [
       new Fuels({id: 0, name: "Gasoline"}),
       new Fuels({id: 1, name: "Diesel"}),
       new Fuels({id: 2, name: "Hybrid"})
    ];
   
    this._carService.getCategories().subscribe(
      categories =>{ this.categories = categories;
        if (this.car?.category != null){ 
          this.selectedCategory= this.car?.category?.name;
          if (this.categories != null){
            const selectedCategory = this.categories.find(s => s.name == this.car?.category?.name);
            if (this.car!= null){
                this.car.category = selectedCategory != null ? selectedCategory : null;
         }}
        }
        this.x = this.car?.category?.engineCapacity;
        this.y = this.car?.category?.weight;
       
        if (this.selectedFuel != null && this.selectedFuel != undefined){
          this.selectedFuel = this.fuels?.find(s => s.id == this.car?.fuel);
        }
      ;
    },
      error => {
        console.log('error', error)
        }
      );
      this.types = ["Budget", "Premium", "Luxury"];      
      this.fuelss = ["Gasoline", "Diesel", "Hybrid"];
   }
     
   compareFn(item: Fuels, selectedFuel: Fuels) {
    return item.id === selectedFuel.id
  }

   editCar(): void {
      if (this.car) {
        if (this.car.type == "Budget") {
          this.car.airConditioning = false;
          this.car.electricWindow = false;
          this.car.parkingSenzor = false;
          this.car.USBPort = false;
          this.car.parktronicSystem = false;
          this.car.infotainmentSystem = false;
          this.car.radio = RadioType.ANALOG;
        }
        else if (this.car.type == "Premium"){
          this.car.airConditioning = true;
          this.car.electricWindow = true;
          this.car.parkingSenzor = true;
          this.car.USBPort = true;
          this.car.parktronicSystem = false;
          this.car.infotainmentSystem = false;
          this.car.radio = RadioType.DIGITAL;
        }
        else if (this.car.type == "Luxury"){
          this.car.airConditioning = true;
          this.car.electricWindow = true;
          this.car.parkingSenzor = true;
          this.car.USBPort = true;
          this.car.parktronicSystem = true;
          this.car.infotainmentSystem = true;
          this.car.radio = RadioType.DIGITAL;
        }
        if (this.car.category != null) {
            this.car.category.name = this.selectedCategory;
          }

        if (this.car.fuel != null && this.car.fuel != undefined) {
              if (this.selectedFuel != null && this.selectedFuel!= undefined) {
                this.zz = this.fuels?.find(s => s.id == this.selectedFuel);
                this.car.fuel = this.zz.id;
              }            
          }

        this._carService.updateCar(this.car).subscribe(
          result =>{
           console.log('success: ', result);
          },
          error => {
            console.log('error', error);
          }
        );
        this.activeModal.close();
      }
    }

    addCar() {
    console.log('in onSubmit: ', this.carForm.valid);
     this.car = this.carForm.getRawValue();
     const timeNow: Moment = moment();  
     this.car.createdOn = timeNow.toString(); 
     //this.car.createdOn = moment().toString();
        
     if (this.car.vin){
        let vinn: number = + this.car.vin ;
        this.car.vin = vinn;
      }
      if (this.car.doorNr){
        let nr: number = + this.car.doorNr ;
        this.car.doorNr = nr;
      }

      if (this.car.type == "Budget") {
        this.car.airConditioning = false;
        this.car.electricWindow = false;
        this.car.parkingSenzor = false;
        this.car.USBPort = false;
        this.car.parktronicSystem = false;
        this.car.infotainmentSystem = false;
        this.car.radio = RadioType.ANALOG;
      }
      else if (this.car.type == "Premium"){
        this.car.airConditioning = true;
        this.car.electricWindow = true;
        this.car.parkingSenzor = true;
        this.car.USBPort = true;
        this.car.parktronicSystem = false;
        this.car.infotainmentSystem = false;
        this.car.radio = RadioType.DIGITAL;
      }
      else if (this.car.type == "Luxury"){
        this.car.airConditioning = true;
        this.car.electricWindow = true;
        this.car.parkingSenzor = true;
        this.car.USBPort = true;
        this.car.parktronicSystem = true;
        this.car.infotainmentSystem = true;
        this.car.radio = RadioType.DIGITAL;
     }
     this._carService.getCategories().subscribe(
        categories =>{ this.categories = categories},
        error => {
          console.log('error', error)
          }
        );
     
      if (this.car.fuel != null && this.car.fuel != undefined) {
          this.zz = this.fuels?.find(s => s.name == this.car?.fuel);
          this.car.fuel = this.zz.id;           
    }


     this._carService.addCar(this.car).subscribe(
              result =>{
                //this.router.navigate(['/cars']);
                //this._carService.getCars();
                this.modalOutput.closeStatus  = true;
                console.log('success: ', result);
                this.close(this.modalOutput);
              },
              error => {
                this.modalOutput.closeStatus  = false;
                console.log('error', error);
                this.close(this.modalOutput);
              }
      );

  }

  checkForm(): boolean {
    let check = this.carForm.invalid;
    return check;
  }

  close(modalOutput: IModalOutput):void {
      this.activeModal.close(modalOutput);   
  }
}
