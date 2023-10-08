import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EbayformComponent } from './components/ebayform/ebayform.component';
import { EbaydataComponent } from './components/ebaydata/ebaydata.component';

@NgModule({
  declarations: [
    AppComponent,
    EbayformComponent,
    EbaydataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
