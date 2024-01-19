import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
//  @Input() car: ICar;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  ModalClose():void {
      const closeMessage = 'Modal closed';
      this.ModalComponent.close(closeMessage)
  }
}
