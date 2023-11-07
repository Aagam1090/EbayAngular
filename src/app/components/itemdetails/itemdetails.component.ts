import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import * as LZString from 'lz-string';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent{

  // baseURL = 'http://localhost:3000';
  baseURL = 'https://web-tech-asg-3.wl.r.appspot.com/';
  loadSingleData: boolean = false;
  @Input() singleItem: any = [];
  activeContent: string = 'Product'; 
  selectedData: any;
  @Output() updateView = new EventEmitter<boolean>();
  apiUrl = this.baseURL+'/wishlist';
  singleItemData: any;
  @Input() clearPressed: boolean = false;

  constructor(private http: HttpClient){
    this.loadSingleData= true;
  }

  ngOnInit(){
    if(this.singleItem.fromWishList == true){
      this.singleItem.inWishlist = true;
    }
  }

  ngOnChanges() {
    this.loadSingleData= true;
    console.log('ItemDetails',this.singleItem);
    this.fetchSingleItem(this.singleItem.itemId).subscribe(response => {
      this.singleItemData = response;
      console.log('singleItemData API Data',this.singleItemData);
      this.loadSingleData = false;
    });
  }
  
  fetchSingleItem(id:string){
    return this.http.get(this.baseURL+'/singleItem?data='+id);
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

  getShippingCost(item: any): string {
    if (item && item.shippingInfo && item.shippingInfo[0] && item.shippingInfo[0].shippingServiceCost) {
      const shippingCost = item.shippingInfo[0].shippingServiceCost[0].__value__;
      if (shippingCost === "0.0") {
        return "Free Shipping";
      } else if (shippingCost) {
        return `$${parseFloat(shippingCost).toFixed(2)}`;
      }
    }
    return "N/A";
  }

  compressData(data: string): string {
    const compressed = LZString.compressToEncodedURIComponent(data);
    return compressed;
  }
/*
  Share Content on Facebook using Facebook Dialog on Angular Project 
  ChatGPT 4. version, OpenAI, 16 Oct. 2023, chat.openai.com/chat,
  */
  openFacebookDialog() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.singleItemData.ViewItemURLForNaturalSearch)}&quote=Buy ${encodeURIComponent(this.singleItemData.title)} at ${this.singleItemData.ConvertedCurrentPrice.Value} from link below`;
    const windowFeatures = `fullscreen=yes, width=${window.screen.width}, height=${window.screen.height}, top=0, left=0`;

    window.open(url, 'Facebook Dialog', windowFeatures);
  }

  trimAfterVarQueryParam(data: any): string {
    const varIndicator = '?var=';
    const varIndex = data.indexOf(varIndicator);
    if (varIndex !== -1) {
      return data.substring(0, varIndex)+'?var=';
    }
    return data;
  }


  onRowButtonClick(data: any) {
    const price = this.getValue(data, ['sellingStatus', '0', 'currentPrice', '0', '__value__']);
    const formattedPrice = (parseFloat(price.toString()).toFixed(2)).toString();
    this.selectedData = {
      Id : this.getValue(data, ['itemId', '0']),
      Image: this.getValue(data, ['galleryURL', '0']),
      Title: this.getValue(data, ['title', '0']),
      Price: formattedPrice,
      ShippingInfo: this.getShippingCost(data),
      PostalCode: this.getValue(data, ['postalCode', '0']),
      Url: this.getValue(data, ['viewItemURL', '0']),
      itemData : data
    };

    data.inWishlist = !data.inWishlist;
    
    if(data.inWishlist == true){
      console.log(this.selectedData);

      const stringJson = JSON.stringify(this.selectedData);
      const compressed = this.compressData(stringJson);
      
      const fullApiUrl = `${this.apiUrl}?data=${compressed}}`;
  
  
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
        .set('Url', this.trimAfterVarQueryParam(this.getValue(data, ['viewItemURL', '0'])));
    
      this.http.get(this.baseURL+'/deleteFromWishlist', { params, responseType: 'text'}).subscribe(
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
