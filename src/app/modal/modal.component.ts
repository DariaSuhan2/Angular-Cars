import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ICar } from '../models/car';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @Input() car?: ICar;
  @Input() from: string = '';
    
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal) {
  }
  //public activeModal: MdbModalRef<ModalComponent>

  ngOnInit(): void {

  }

  close():void {
      this.activeModal.close();
  }
}
