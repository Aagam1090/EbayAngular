import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent {
  @Input() singleItem: any = [];

  content = "";
  renderContent(data:any){
    switch(data){
      case "Product":
        this.content = "Product";
        break;
      case "Photo":
        this.content = "Photo";
        break;
      case "Shipping":
        this.content = "Shipping";
        break;
      case "Seller":
        this.content = "Seller";
        break;
      case "Similar":
        this.content = "Similar";
        break;
    }
  }
}
