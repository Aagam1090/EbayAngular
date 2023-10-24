import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent{
  @Input() singleItem: any = [];
  activeContent: string = 'Product'; 
  selectedData: any;
  @Output() updateView = new EventEmitter<boolean>();
  apiUrl = 'http://localhost:3000/wishlist';

  constructor(private http: HttpClient){}

  ngOnChanges() {
    console.log('ItemDetails',this.singleItem);
  }

  backToResult(){
    console.log("Back to results Clikced");
    this.updateView.emit(false);
  }

  renderContent(content: string) {
    this.activeContent = content;
  }

  isActive(content: string): boolean {
    return this.activeContent === content;
  }

  getValue(item: any, key: string[]): string | number {
    let current = item;
    for (const k of key) {
      if (!current[k]) return "N/A";
      current = current[k];
    }
    return current;
  }

  onRowButtonClick(data: any) {
    this.selectedData = {
      Image: this.getValue(data, ['galleryURL', '0']),
      Title: this.getValue(data, ['title', '0']),
      Price: this.getValue(data, ['sellingStatus', '0', 'currentPrice', '0', '__value__']),
      ShippingInfo: this.getValue(data, ['shippingInfo', '0', 'shippingType', '0']),
      PostalCode: this.getValue(data, ['postalCode', '0']),
      Url: this.getValue(data, ['viewItemURL', '0'])
    };

    data.inWishlist = !data.inWishlist;
    
    if(data.inWishlist == true){
      console.log(this.selectedData);
  
      const params = new URLSearchParams();
      for (const key in this.selectedData) {
        if (this.selectedData.hasOwnProperty(key)) {
          params.set(key, this.selectedData[key]);
        }
      }
      
      const fullApiUrl = `${this.apiUrl}?${params.toString()}`;
  
      this.http.get(fullApiUrl).subscribe(
        response => {
          console.log('Data retrieved successfully', response);
        },
        error => {
          console.error('Error retrieving data', error);
        }
      );
    }
    if(data.inWishlist == false){
      console.log("Removing item from wishlist");

      const params = new HttpParams()
        .set('Image', this.getValue(data, ['galleryURL', '0']))
        .set('Title', this.getValue(data, ['title', '0']))
        .set('Price', this.getValue(data, ['sellingStatus', '0', 'currentPrice', '0', '__value__']))
        .set('ShippingInfo', this.getValue(data, ['shippingInfo', '0', 'shippingType', '0']))
        .set('PostalCode', this.getValue(data, ['postalCode', '0']))
        .set('Url', this.getValue(data, ['viewItemURL', '0']));
    
      this.http.get('http://localhost:3000/deleteFromWishlist', { params, responseType: 'text'}).subscribe(
        response => {
          console.log('Item removed successfully', response);
        },
        error => {
          console.error('Error removing item', error);
        }
      );
    }
  }
}
