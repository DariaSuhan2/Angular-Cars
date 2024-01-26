import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ICar } from '../models/car';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.css'
})
export class AddEditModalComponent implements OnInit{

  @Input() car?: ICar;
  @Input() from: string = '';
 
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal, private _carService: CarService ) {
  }
  //public activeModal: MdbModalRef<ModalComponent>

  ngOnInit(): void {

  }

  // close():void {
  //     this.activeModal.close();
  //     //window.location.reload();
      
  // }
}
