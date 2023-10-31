import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent {
  @Input() item: any;

  ngOnChanges(){
    console.log('Shipping Component',this.item);
  }

  getShippingCost(){
    if(this.item.shippingInfo[0].shippingServiceCost[0].__value__ == 0){
      return 'Free Shipping'
    }
    else{
      return '$' + this.item.shippingInfo[0].shippingServiceCost[0].__value__;
    }
  }

  getHandlingTime(){
    if(this.item.shippingInfo[0].handlingTime <= 1){
      return this.item.shippingInfo[0].handlingTime + " Day";
    }
    else{
      return this.item.shippingInfo[0].handlingTime + " Days";
    }
  }

  getShippingIcon(value: boolean): string {
    return value 
      ? '<i class="fas fa-check"></i>'
      : '<i class="fas fa-xmark"></i>';
  }
}
