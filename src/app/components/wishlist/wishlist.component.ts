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

  getTitle(item: any): string {
    const maxLength = 35;
    if (item.length <= maxLength) {
      return item.title;
    }

    const truncatedString = item.substring(0, maxLength);
    const lastSpaceIndex = truncatedString.lastIndexOf(' ');
    
    if (lastSpaceIndex === -1) {
      return truncatedString + '...';
    }
    return item.substring(0, lastSpaceIndex) + '...';
  }

  detail(response:any){
    console.log("Clicked Detail");
  }

  removeWishListData(id:any){
    return this.http.get('http://localhost:3000/wishlistdata/'+id);
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.wishListData) {
      total += parseFloat(item.Price);
    }
    return parseFloat(total.toFixed(2));
  }
}
