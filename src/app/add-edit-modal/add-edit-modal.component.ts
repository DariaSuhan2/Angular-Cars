import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ICar, RadioType } from '../models/car';
import { CarService } from '../service/car.service';
import { Observable } from 'rxjs/internal/Observable';
import { ICarCategory } from '../models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.css'
})
export class AddEditModalComponent implements OnInit{

  @Input() car?: ICar;
  @Input() from: string = '';
  @Input() category?: ICarCategory;
  // @Input() engineCapacity: number = 0;
  // @Input() weight: number = 0;
  selectedCategory : string | null = null;
  x: any;
  y: any;
  addedCategory?: string;
  subscriptionCategories = Observable<ICarCategory[]>;
  types?: Array<string>;
  categories?: Array<ICarCategory>;
  addedCar?: ICar;

  carForm = this.fb.nonNullable.group({
    vin:  [0, Validators.min(1)],
    color: ['', Validators.required],
    brand: ['', Validators.required],
    doorNr: [0, Validators.min(1)],
    category: this.fb.nonNullable.group({
      name: [null, Validators.required],
      engineCapacity: [0, Validators.min(1)],
      weight:[0, Validators.min(1)],
    }),
    airConditioning: <boolean | null>null,
    electricWindow: <boolean | null>null,
    parkingSenzor: <boolean | null>null,
    USBPort: <boolean | null>null,
    parktronicSystem: <boolean | null>null,
    infotainmentSystem: <boolean | null>null,
    radio: <RadioType | null>null,
    type: [null, Validators.required]

  }
  );
 
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal, 
    private _carService: CarService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
     ) {
  }
  //public activeModal: MdbModalRef<ModalComponent>

  ngOnInit(): void {
    // this._carService.getCategories().subscribe(categories => this.categories = categories);
    // if (this.car?.category != null){ 
    //   this.selectedCategory= this.car?.category?.name;
      
    // }
    
    // this.x= this.car?.category?.engineCapacity;
    // this.y= this.car?.category?.weight;


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
        
        this.x= this.car?.category?.engineCapacity;
        this.y= this.car?.category?.weight;
    },
      error => {

        console.log('error', error)
        }
      );
  //   if (this.categories != null){
  //     const selectedCategory = this.categories.find(s => s.name == this.addedCar?.category?.name);
  //     if (this.addedCar!= null){
  //         this.addedCar.category = selectedCategory != null ? selectedCategory : null;
  //  }} 
  
  
    this.types = ["Budget", "Premium", "Luxury"];
  
    
    // if (this.car?.category != null){ 
    //   this.selectedCategory= this.car?.category?.name;
    // }
      
  
   
    
   
    // if (this.categories != null) {
    //   const selectedCategory = this.categories.find(s => s.name == this.addedCar?.category?.name);
    //   // this.selectedCategory= this.car.category?.name || null;
    //   // this.car.category?.engineCapacity= this.categories
    // }

  //   if (this.categories != null){
  //     const selectedCategory = this.categories.find(s => s.name == this.addedCar?.category?.name);
  //     if (this.addedCar!= null){
  //         this.addedCar.category = selectedCategory != null ? selectedCategory : null;
  //  }}
   
   }
   

   save(): void {
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
        // this._carService.updateCar(this.car)
        //         .subscribe(() => this.goBack())
        this.activeModal.close();
      }
    }

  

  onSubmit() {
    console.log('in onSubmit: ', this.carForm.valid);
     this.car = this.carForm.getRawValue();

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
     if (this.categories != null){
        const selectedCategory = this.categories.find(s => s.name == this.car?.category?.name);
        if (this.car!= null){
            this.car.category = selectedCategory != null ? selectedCategory : null;
     }}

     this._carService.addCar(this.car).subscribe(
              result =>{
              this.router.navigate(['/cars']);
               console.log('success: ', result);
              },
              error => {
                console.log('error', error);
              }
      );
      this.activeModal.close();

      // const modalComponent = this.modalService.open(ModalComponent);
      // modalComponent.componentInstance.car = this.addedCar;
      // modalComponent.componentInstance.from = 'addCar';

  }
  

  close():void {
      this.activeModal.close();
          
  }
}
