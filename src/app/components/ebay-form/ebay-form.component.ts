import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-ebay-form',
  templateUrl: './ebay-form.component.html',
  styleUrls: ['./ebay-form.component.css']
})
export class EbayFormComponent {
  
  keyword:string = '';
  selectedCategory:string = "All Categories"
  displayKeywordError = false;
  displayLocationError = false;
  distance:number = 10;
  zip:any = "";
  apiUrl = 'http://localhost:3000/api/ebay';
  data = {};
  postalcode:string = "";

  constructor(private http: HttpClient) { }

  get isValidKeyword(): boolean {
    return ( this.keyword!= null && this.keyword != '' );
  }

  getData(form: NgForm): void {
    this.displayKeywordError = !this.validateKeyword(form.value.keyword);
    this.displayLocationError = !this.validateLocation(form.value.location, form.value.zip);
    console.log('displayKeywordError:', this.displayKeywordError);
    console.log('displayLocationError:', this.displayLocationError);    
    if(this.displayKeywordError || this.displayLocationError) {
        return;
    }
    
    console.log('Form data submitted: ', form.value);
    if (form.value.location == 'CurrentLocation') {
      console.log("Aagam Shah");
      this.fetchIpAddress().subscribe((response: any) => {
        const ipData = response as IpData;
        console.log('IP Data:', ipData);
        this.postalcode = ipData.postal;
        console.log('Postal Code:', this.postalcode);
        form.value.zip = this.postalcode;
        // Move the fetchData call here after getting IP data
        this.fetchData(form.value).subscribe(response => {
          this.data = response;
          console.log(this.data);
        });
      });
    } else {
      this.fetchData(form.value).subscribe(response => {
        this.data = response;
        console.log(this.data);
      });
    }
  }

  fetchIpAddress(){
    return this.http.get('https://ipinfo.io/json?token=5fecd46b16293a');
  }

  fetchData(formValues: any){
    let params = new HttpParams();
    // Set all form values as query parameters
    for (let key in formValues) {
      if (formValues.hasOwnProperty(key) && formValues[key] !== '') {
        params = params.set(key, formValues[key]);
      }
    }
    console.log(this.apiUrl);
    console.log(params.toString());
    return this.http.get(this.apiUrl, { params });
  }
  
  validateKeyword(keyword: string): boolean {
    return Boolean(keyword) && keyword.trim() !== '';
  }

  validateLocation(location: string, zip?:number|string): boolean {
    if (location === 'Other' && (!zip || zip.toString().trim() === '')) {
      this.displayLocationError = true;
      return false;
    }
    this.displayLocationError = false;
    console.log(location);
    console.log(zip);
    return location === 'CurrentLocation' || location === 'Other';
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    setTimeout(() => {
      this.selectedCategory = "All Categories";
      this.distance = 10;
      this.displayKeywordError = false;
      this.displayLocationError = false;
    });
  }
}
interface IpData {
  city: string;
  country: string;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
};