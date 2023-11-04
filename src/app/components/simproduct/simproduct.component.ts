import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simproduct',
  templateUrl: './simproduct.component.html',
  styleUrls: ['./simproduct.component.css']
})
export class SimproductComponent {
  @Input() product: any;
  similarProducts: any = [];

  constructor(private http: HttpClient) { }

  ngOnChanges(){
    console.log('Similar Products Component',this.product);
    this.fetchSimilarProducts(this.product.ItemID).subscribe(response => {
      this.similarProducts = response;
      console.log('Similar Products API Data',this.similarProducts);
    }); 
  }

  fetchSimilarProducts(id:any){
    console.log('http://localhost:3000/similar?itemId='+id);
    return this.http.get('http://localhost:3000/similar?itemId='+id);
  }

  getDaysLeft(product:any): string {
    let timeLeft = product.timeLeft;
    let startIndex = timeLeft.indexOf('P') + 1; 
    let endIndex = timeLeft.indexOf('D');
    let daysLeft = timeLeft.substring(startIndex, endIndex);
    return daysLeft;
  }
}
