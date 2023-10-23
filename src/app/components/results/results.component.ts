import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() item: any = []; 
  @Input() isDataLoaded: boolean = false;
  selectedData: any;
  apiUrl = 'http://localhost:3000/wishlist';
  itemsInCart: any = {};

  // Pagination properties
  itemsPerPage: number = 10;
  currentPage: number = 1;
  paginatedItems: any[] = [];
  totalPages: number = 0; 

  constructor(private http: HttpClient, private router: Router) { }

  ngOnChanges(changes: SimpleChanges){
    if(changes['item'] && this.item.data){
      // Check for item data length, if it's 0 reset pagination
      if(this.item.data.length === 0) {
        this.paginatedItems = [];
        this.totalPages = 0; // Reset total pages
      } else {
        this.totalPages = this.getTotalPages(); // Calculate total pages when items change
        this.currentPage = 1; // Reset to first page when new data arrives
        this.paginatedItems = this.getPaginatedItems();
      }
      console.log("Something Changed");
      console.log(this.item);
      console.log(this.paginatedItems);
      console.log(this.totalPages);
      console.log(this.currentPage);
    }
  }

  getPaginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    // Prevent slice from selecting out of bounds by using the array's length
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.item.data.length);
    return this.item.data.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.item.data.length / this.itemsPerPage);
  }

  // Call this method in the template to get an array of page numbers
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

  onRowButtonClick(data: any) {
    this.selectedData = {
      Image: this.getValue(data, ['galleryURL', '0']),
      Title: this.getValue(data, ['title', '0']),
      Price: this.getValue(data, ['sellingStatus', '0', 'currentPrice', '0', '__value__']),
      ShippingInfo: this.getValue(data, ['shippingInfo', '0', 'shippingType', '0']),
      PostalCode: this.getValue(data, ['postalCode', '0']),
      Url: this.getValue(data, ['viewItemURL', '0'])
    };

    data.inCart = !data.inCart;
    
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
}
