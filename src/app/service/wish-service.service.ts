import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishServiceService {
  wishListData :any = [];
  constructor() { }

  addToWishList(data:any){
    this.wishListData =  data;
    console.log("Data in WishList Service",this.wishListData);
  }

  getWishListData(){
    return this.wishListData;
  }

}
