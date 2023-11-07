import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EbayFormComponent } from './components/ebay-form/ebay-form.component';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemdetailsComponent } from './components/itemdetails/itemdetails.component';
import { ProductComponent } from './components/product/product.component';
import { PhotoComponent } from './components/photo/photo.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { SellerComponent } from './components/seller/seller.component';
import { SimproductComponent } from './components/simproduct/simproduct.component';
import { MatIconModule } from '@angular/material/icon';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    EbayFormComponent,
    ResultsComponent,
    WishlistComponent,
    ItemdetailsComponent,
    ProductComponent,
    PhotoComponent,
    ShippingComponent,
    SellerComponent,
    SimproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    MatIconModule,
    RoundProgressModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
