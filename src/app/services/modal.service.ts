import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalOptions: NgbModalOptions = {
    backdrop: "static",
    keyboard: false,
    centered: true,
    size: "xl",
  }

  private modalRef!: NgbModalRef;

  constructor(private modalSvc: NgbModal) { }

  openModal(content: TemplateRef<any>, options?: NgbModalOptions): void {
    const currentOptions: NgbModalOptions = { ...this.modalOptions, ...options }

    this.modalRef = this.modalSvc.open(content, currentOptions)
  }

  closeModal(): void {
    this.modalRef?.close()
  }
}
