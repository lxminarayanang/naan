import { Component, Injectable, Input, OnInit, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()

export class ModalComponent implements OnInit {

  @Input()title: string = "";
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>;
  @Input()className: string = "";
  @Input()backdrop: any = "static";
  @Input()size: string = "md";
  @Input()showHeader: boolean = true;
  @Input()animation: boolean = true;
  @Input()centered: boolean = true;
  @Input()showSaveBtn: boolean = true;
  @Input()cancelSaveBtn: boolean = true;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  isDisable: boolean = false;

  get disableBtn(): boolean {
    return this.isDisable;
  }
  
  @Input() set disableBtn(value: boolean) {
    this.isDisable = value;        
  }

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

  open() {
    this.activeModal = this.modalService.open(
      this.modalContent,
      {
        "windowClass":"common-modal "+this.className,
        "animation":true,
        "backdrop":this.backdrop,
        "centered":this.centered,
        "size":this.size
      }
    );
  }

  close(){
    this.activeModal.close();
  }

  submit() {
    this.onSubmit.emit();
  }

}
