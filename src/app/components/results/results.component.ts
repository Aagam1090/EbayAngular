import { Component,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() item :any = []; 
  @Input() isDataLoaded :boolean = false;
  selectedData: any;
  apiUrl = 'http://localhost:3000/wishlist';

  constructor(private http: HttpClient,private router: Router) { }

  ngAfterContentChecked(){
    this.isEmptyObject(this.item);
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
  
    console.log(this.selectedData);  // just for checking purposes
  
    // Construct the URL with the selectedData as query parameters
    const params = new URLSearchParams();
    for (const key in this.selectedData) {
      if (this.selectedData.hasOwnProperty(key)) {
        params.set(key, this.selectedData[key]);
      }
    }
    
    const fullApiUrl = `${this.apiUrl}?${params.toString()}`;
  
    // Using http.get instead of http.post
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

interface Item {
  url: string;
  data: any; // You can make this more specific if you know the structure
  totalEntries: number;
}
