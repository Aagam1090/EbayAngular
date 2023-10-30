import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() item: any = []; 
  @Input() isDataLoaded: boolean = false;
  @Input() clearPressed: boolean = false;
  selectedData: any;
  apiUrl = 'http://localhost:3000/wishlist';
  itemsInCart: any = {};
  wishlistItems: any[] = [];
  detailedItem:any = [];
  detailedSelected : boolean = false;

  // Pagination properties
  itemsPerPage: number = 10;
  currentPage: number = 1;
  paginatedItems: any[] = [];
  totalPages: number = 0; 

  constructor(private http: HttpClient, private router: Router) { }

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
  }

  changeVal(val:boolean){
    console.log("Value changed");
    this.detailedSelected = val;
    console.log(this.detailedSelected);
    console.log(this.paginatedItems);
  }

  goToDetail(){
    this.detailedSelected = true;
  }

  fetchWishlistItems() {
    this.http.get('http://localhost:3000/wishlistdata').subscribe(
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
        item.galleryURL[0] === wishlistItem.Image &&
        item.title[0] === wishlistItem.Title &&
        item.sellingStatus[0].currentPrice[0].__value__ === wishlistItem.Price &&
        item.shippingInfo[0].shippingType[0] === wishlistItem.ShippingInfo &&
        item.postalCode[0] === wishlistItem.PostalCode &&
        item.viewItemURL[0] === wishlistItem.Url
      );
    });
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

  getValue(item: any, key: string[]): string | number {
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
  detail(response:any){
    console.log('Data Clicked for details', response);
    this.detailedItem = response;
    this.detailedSelected = true;
  }
}
