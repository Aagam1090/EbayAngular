import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-simproduct',
  templateUrl: './simproduct.component.html',
  styleUrls: ['./simproduct.component.css']
})
export class SimproductComponent {
  @Input() product: any;
  similarProducts: any = [];
  similarProductsCopy: any = [];
  sortCriteria: string = 'Default';
  sortOrder: string = 'Ascending';
  showMore: boolean = false;

  constructor(private http: HttpClient) {}

  ngDoCheck()	{
    if(this.similarProductsCopy.length == 0 && this.similarProducts.length > 0){
      this.similarProductsCopy = [...this.similarProducts];
      console.log('SimilarProductsCopy',this.similarProductsCopy);
    }
    if(this.sortCriteria == 'Default' && this.similarProductsCopy.length > 0){
      this.similarProducts = [...this.similarProductsCopy];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Similar Products Component',this.product);
    this.fetchSimilarProducts(this.product.ItemID).subscribe(response => {
      this.similarProducts = response;
      console.log('Similar Products API Data',this.similarProducts);
    }); 
    if (changes['sortCriteria'] && changes['sortCriteria'].currentValue === 'Default') {
      this.resetToOriginal();
    } else {
      this.sortingSimilarProducts();
    }
  }

  sortingSimilarProducts(): void {
    if (this.sortCriteria !== 'Default') {
      this.similarProducts.sort((a: any, b: any) => {
        let comparison = 0;
        if (this.sortCriteria === 'Product Name') {
          comparison = a.title.localeCompare(b.title);
        } else if (this.sortCriteria === 'Days Left') {
          comparison = this.getDaysLeft(a) - this.getDaysLeft(b);
        } else if (this.sortCriteria === 'Price') {
          comparison = a.buyItNowPrice.__value__ - b.buyItNowPrice.__value__;
        } else if (this.sortCriteria === 'Shipping Cost') {
          comparison = a.shippingCost.__value__ - b.shippingCost.__value__;
        }
        return this.sortOrder === 'Descending' ? -comparison : comparison;
      });
    }
  }

  resetToOriginal(): void {
    this.similarProducts = [...this.similarProductsCopy];
  }

  fetchSimilarProducts(id:any){
    console.log('http://localhost:3000/similar?itemId='+id);
    return this.http.get('http://localhost:3000/similar?itemId='+id);
  }

  getDaysLeft(product:any): number {
    let timeLeft = product.timeLeft;
    let startIndex = timeLeft.indexOf('P') + 1; 
    let endIndex = timeLeft.indexOf('D');
    let daysLeft = parseInt(timeLeft.substring(startIndex, endIndex),0);
    return daysLeft;
  }

  getDisplayedProducts() {
    if(this.showMore == true){
      return this.similarProducts;
    }
    else{
      return this.similarProducts.slice(0, 5);
    }
  }

  toggleShowMore(){
    this.showMore = !this.showMore;
    console.log('Show More',this.showMore);
  }
  
}
