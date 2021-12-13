import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr:ToastrService) { }

  ngOnInit(): void 
  {
    this.service.refreshList()
  }

  populateForm(selectedRecord:PaymentDetail)
  {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number)
  {
    if(confirm('¿Estas seguro de querer borrar este elemento?'))
    {
      this.service.deletePaymentDetail(id).subscribe
      (
        res=>
        {
          this.service.refreshList();
          this.toastr.error('Eliminado exitosamente', 'Payment Detail Register')
        },
        err=>{console.log(err)}
      );
    }
  }
}
