import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Router } from '@angular/router';
import * as LZString from 'lz-string';
import { WishServiceService } from 'src/app/service/wish-service.service';
import { ResultServiceService } from 'src/app/service/result-service.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {

  // baseURL = 'http://localhost:3000';
  baseURL = 'https://web-tech-asg-3.wl.r.appspot.com/';

  @Input() item: any = []; 
  @Input() isDataLoaded: boolean = false;
  @Input() clearPressed: boolean = false;
  selectedData: any;
  apiUrl = this.baseURL+'/wishlist';
  itemsInCart: any = {};
  wishlistItems: any[] = [];
  detailedItem:any = [];
  detailedSelected : boolean = false;
  detailedButtonEnabled : boolean = false;

  // Pagination properties
  itemsPerPage: number = 10;
  currentPage: number = 1;
  paginatedItems: any[] = [];
  totalPages: number = 0; 

  constructor(private http: HttpClient, private router: Router,private resultService : ResultServiceService) { }

  ngOnChanges(changes: SimpleChanges){
    if(changes['item'] && this.item.data){
      this.detailedSelected = false;
      this.detailedItem = [];
      if(this.item.data.length === 0) {
        this.paginatedItems = [];
        this.totalPages = 0; 
      } else {
        this.totalPages = this.getTotalPages(); 
        this.currentPage = 1;
        this.paginatedItems = this.getPaginatedItems();
      }
      console.log("Something Changed");
      console.log(this.item);
      console.log(this.paginatedItems);
      console.log(this.totalPages);
      console.log(this.currentPage);
      this.fetchWishlistItems();
    }
    if(this.clearPressed == true){
      this.detailedItem = [];
      this.detailedSelected = false;
    }
    if(this.resultService.getResultsData().length != 0){
      this.detailedItem = this.resultService.getResultsData();
      this.detailedButtonEnabled = true;
    }
  }

  changeVal(val:boolean){
    console.log("Value changed");
    this.detailedSelected = val;
    console.log(this.detailedSelected);
    console.log(this.paginatedItems);
  }

  goToDetail(){
    if(this.resultService.getResultsData().length != 0){
      this.detailedItem = this.resultService.getResultsData();
      this.detailedSelected = true;
    }
  }

  fetchWishlistItems() {
    this.http.get(this.baseURL+'/wishlistdata').subscribe(
      (data: any) => {
        this.wishlistItems = data;
        this.checkItemsInWishlist();
        console.log(this.item);
      },
      error => {
        console.error('Error retrieving wishlist items', error);
      }
    );
  }

  checkItemsInWishlist() {
    this.paginatedItems.forEach(item => {
      item.inWishlist = this.isItemInWishlist(item);
    });
  }

  isItemInWishlist(item: any): boolean {
    return this.wishlistItems.some(wishlistItem => {
      return (
        item.itemId[0] === wishlistItem.Id
      );
    });
  }


  getTitle(item: any): string {
    const maxLength = 35;
    if (item.title[0].length <= maxLength) {
      return item.title;
    }

    const truncatedString = item.title[0].substring(0, maxLength);
    const lastSpaceIndex = truncatedString.lastIndexOf(' ');
    
    if (lastSpaceIndex === -1) {
      return truncatedString + '...';
    }
    return item.title[0].substring(0, lastSpaceIndex) + '...';
  }

  getPaginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.item.data.length);
    return this.item.data.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.item.data.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number): void {
    if(page < 1 || page > this.totalPages) return; 
    this.currentPage = page;
    this.paginatedItems = this.getPaginatedItems();
  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  getValue(item: any, key: string[]): any{
    let current = item;
    for (const k of key) {
      if (!current[k]) return "N/A";
      current = current[k];
    }
    return current;
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
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

  onRowButtonClick(data: any) {
    const price = this.getValue(data, ['sellingStatus', '0', 'currentPrice', '0', '__value__']);
    const formattedPrice = (parseFloat(price.toString()).toFixed(2)).toString();
    console.log('Data Clicked', data);
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
      const price = this.getValue(data, ['sellingStatus', '0', 'currentPrice', '0', '__value__']);
      const formattedPrice = (parseFloat(price.toString()).toFixed(2)).toString();
      const params = new HttpParams()
        .set('Id', this.getValue(data, ['itemId', '0']))
        .set('Image', this.getValue(data, ['galleryURL', '0']))
        .set('Title', this.getValue(data, ['title', '0']))
        .set('Price', price)
        .set('ShippingInfo', this.getShippingCost(data))
        .set('PostalCode', this.getValue(data, ['postalCode', '0']))
        .set('Url', this.getValue(data, ['viewItemURL', '0']));
    
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
  detail(response:any,event: Event){
    event.preventDefault();
    event.stopPropagation();
    console.log('Data Clicked for details', response);
    this.resultService.addToResults(response);
    this.paginatedItems.forEach(item => {
      item.isHighlighted = false;
    });
    response.isHighlighted = true;
    this.detailedItem = response;
    this.detailedSelected = true;
    this.detailedButtonEnabled = true;
  }
}
