import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnChanges {

  @Input() isWishlistClicked: boolean = false;
  @Input() clearPressed: boolean = false;
  wishListData: any[] = [];
  detailedItem:any = [];
  detailedSelected : boolean = false;


  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchWishListData().subscribe((data: any) => {
      this.wishListData = data;
      console.log(this.wishListData);
    });
    if(this.clearPressed == true){
      this.detailedItem = [];
      this.detailedSelected = false;
    }
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


  removeWishListData(id:any){
    return this.http.get('http://localhost:3000/wishlistdata/'+id);
  }

  detail(response: any) {
    const respData: any = [];
    console.log('Data Clicked for details', response);
    
    respData.inWishlist = true;
    respData.itemId = [];
    respData.itemId.push(response.Id); 
    respData.title = response.Title;
    respData.shippingInfo = [];
    respData.shippingInfo.push({
      shippingServiceCost: response.ShippingInfoData.ShippingCost,
      expeditedShipping: response.ShippingInfoData.ExpeditedShipping,
      oneDayShippingAvailable: response.ShippingInfoData.OneDayShippingAvailable,
      returnsAccepted: response.ShippingInfoData.ReturnsAccepted,
      handlingTime: response.ShippingInfoData.HandlingTime,
    }); 
    this.detailedItem = respData;
    this.detailedSelected = true;
  }
  

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.wishListData) {
      total += parseFloat(item.Price);
    }
    return parseFloat(total.toFixed(2));
  }
}
