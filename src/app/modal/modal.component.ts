import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
//  @Input() car: ICar;
    // @ViewChild('closeBtn') closeBtn: ElementRef;


  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  modalClose():void {
      //const closeMessage = 'Modal closed';
     //$('.modal').modal('hide');
      //this.ModalComponent.close(closeMessage);
      //$("#myModal").modal("hide");
      //this.modalController.dismiss();
      //this.basicModal.hide();
      //this.closeBtn.nativeElement.click();
     
  }
}
