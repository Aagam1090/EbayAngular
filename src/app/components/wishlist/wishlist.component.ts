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
}
