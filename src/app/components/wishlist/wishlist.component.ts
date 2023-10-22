import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  @Input() isWishlistClicked: boolean = false;
  wishListData: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnChanges(): void {
    this.fetchWishListData().subscribe((data: any) => {
      this.wishListData = data;
      console.log(this.wishListData);
    });
  }

  fetchWishListData(){
    return this.http.get('http://localhost:3000/wishlistdata');
  }

  removeWishList(data:any){
    console.log("Clikced Me");
    console.log(data._id);
    this.removeWishListData(data._id).subscribe((data: any) => {
      console.log(data);
      this.fetchWishListData().subscribe((data: any) => {
        this.wishListData = data;
        console.log(this.wishListData);
      });
    });
  }

  removeWishListData(id:any){
    return this.http.get('http://localhost:3000/wishlistdata/'+id);
  }
}
