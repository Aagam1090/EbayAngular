import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent {
  @Input() item: any;

  getShippingCost(){
    if(this.item.shippingInfo[0].shippingServiceCost[0].__value__ == 0){
      return 'Free Shipping'
    }
    else{
      return '$' + this.item.shippingInfo[0].shippingServiceCost[0].__value__;
    }
  }

  getShippingIcon(value: boolean): string {
    return value 
      ? '<i class="fas fa-check"></i>'
      : '<i class="fas fa-xmark"></i>';
  }
}
