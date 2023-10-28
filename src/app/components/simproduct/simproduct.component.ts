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
    this.fetchSimilarProducts(this.product.itemId[0]).subscribe(response => {
      this.similarProducts = response;
      console.log('Similar Products API Data',this.similarProducts);
    }); 
  }

  fetchSimilarProducts(id:any){
    console.log('http://localhost:3000/similar?itemId='+id);
    return this.http.get('http://localhost:3000/similar?itemId='+id);
  }
}
