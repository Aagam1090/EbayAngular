import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultServiceService } from 'src/app/service/result-service.service';

@Component({
  selector: 'app-ebay-form',
  templateUrl: './ebay-form.component.html',
  styleUrls: ['./ebay-form.component.css']
})
export class EbayFormComponent{
  
  keyword:string = '';
  selectedCategory:string = "0"
  distance:number = 10;
  zip:any = "";
  currentLocation = "CurrentLocation";
  displayKeywordError = false;
  displayLocationError = false;
  submitEnable = false;
  location = "CurrentLocation";
  dataSubmitted = false;
  clearPressed :boolean = false;
  filteredZipcodes:string[] = [];
  // apiUrl = 'http://localhost:3000/api/ebay';
  // zipCodeUrl = 'http://localhost:3000/zip';
  apiUrl = 'https://web-tech-asg-3.wl.r.appspot.com/api/ebay';
  zipCodeUrl = 'https://web-tech-asg-3.wl.r.appspot.com/zip';
  ebayData = {};
  postalcode:string = "";
  disableZipCode :boolean = true;
  zipData: any[] = [];
  isResultsActive: boolean = true;
  submitClicked: boolean = false;
  @ViewChild('keywordField') keywordField!: NgModel;

  constructor(private http: HttpClient,private resultService: ResultServiceService) { }

  ngDoCheck() {
    if (this.keywordField) {
      if(this.keywordField.touched && (this.keyword == "" || this.keyword == null || this.keyword == undefined || this.keyword.trim() == "")){
        this.displayKeywordError = !this.validateKeyword(this.keyword);
      }
      else if(this.keywordField.touched && this.keyword.trim() == "" && this.submitClicked == true){
        this.displayKeywordError = true;
      }
      else{
        this.displayKeywordError = false;
      }
    }
  }

  ngAfterContentChecked() { 
    if(this.keyword || this.keyword == null || this.keyword == undefined || this.keyword.trim() == ""){
      this.submitEnable = false;
    }
    if(this.location == "OtherLocation" && (this.zip == "" || this.zip == null || this.zip == undefined || this.zip.toString().trim() == "" || this.zip.toString().length != 5)){
      this.submitEnable = false;
    }
    if(this.keyword != null && this.keyword != undefined){
      if(this.keyword.length!=0 && this.keyword.trim()!= "")
      {
        if(this.location == "OtherLocation" && (this.zip == "" || this.zip == null || this.zip == undefined || this.zip.toString().trim() == "" || this.zip.toString().length != 5)){
          this.submitEnable = false;
        }
        else{
          this.submitEnable = true;
        }
      }
    }
    if(this.location == "OtherLocation" && (this.zip == "" || this.zip == null || this.zip == undefined || this.zip.toString().trim() == "") ){
      this.displayLocationError=true;
    }
    if(this.location == "OtherLocation" && (this.zip != "" && this.zip.length >0) ){
      this.displayLocationError= false;
    }
    if(this.location == "CurrentLocation"){
      this.displayLocationError = false;
      this.zip="";
      this.disableZipCode = true;
    }
    if(this.location == "OtherLocation"){
      this.disableZipCode = false;
    }
  }


  completeZipCode(event:any){
    this.zip=  event.target.value;
    if(this.zip && this.zip.length > 0){
      this.filteredZipcodes = [];
      this.fetchZipCode(this.zip).subscribe((response: any) => {
        console.log(response);
        if (response.hasOwnProperty('postalCodes') && Array.isArray(response.postalCodes)) {
          this.zipData = response.postalCodes;
          this.filteredZipcodes = this.zipData.map((item: any) => item.postalCode);
        } else {
          console.error('postalCodes property not found or not an array:', response);
        }
      });
    }
  }

  fetchZipCode(zipCode : string){
    let params = new HttpParams();
    params = params.set('zip',this.zip);
    return this.http.get(this.zipCodeUrl, { params });
  }

  isValidKeyword(): boolean {
    return ( this.keyword!= null && this.keyword != '' );
  }

  getData(form: NgForm): void {
    this.submitClicked = true;
    this.displayKeywordError = !this.validateKeyword(form.value.keyword);
    this.displayLocationError = !this.validateLocation(form.value.location, form.value.zip);
    if(this.displayKeywordError || this.displayLocationError) {
        return;
    }
    
    console.log('Form data submitted: ', form.value);
    form.value.keyword = form.value.keyword.trim();
    console.log('Form data Updated submitted: ', form.value);
    this.submitClicked = true;
    this.isResultsActive = true;
    this.clearPressed = false;
    if (form.value.location == 'CurrentLocation') {
      this.dataSubmitted = true;
      this.fetchIpAddress().subscribe((response: any) => {
        const ipData = response as IpData;
        this.postalcode = ipData.postal;
        form.value.zip = this.postalcode;
        this.fetchData(form.value).subscribe(response=> {
          this.ebayData = response;
          this.dataSubmitted = false;
        });
      });
    } else {
      this.fetchData(form.value).subscribe(response => {
        this.ebayData = response;
        console.log('Ebay API Data',this.ebayData);
        this.dataSubmitted = false;
      });
    }
  }

  fetchIpAddress(){
    return this.http.get('https://ipinfo.io/json?token=5fecd46b16293a');
  }

  fetchData(formValues: any){
    let params = new HttpParams();

    for (let key in formValues) {
      if (formValues.hasOwnProperty(key) && formValues[key] !== '') {
        params = params.set(key, formValues[key]);
      }
    }
    console.log('Form Values Passed as Params',params);
    return this.http.get(this.apiUrl, { params });
  }
  
  validateKeyword(keyword: string): boolean {
    return Boolean(keyword) && keyword.trim() !== '';
  }

  validateLocation(location: string, zip?:number|string): boolean {
    if (location == 'OtherLocation' && (!zip || zip.toString().trim() === '')) {
      this.displayLocationError = true;
      return false;
    }
    this.displayLocationError = false;
    return location == 'CurrentLocation' || location == 'OtherLocation';
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    setTimeout(() => {
      this.distance = 10;
      this.displayKeywordError = false;
      this.displayLocationError = false;
      this.submitEnable = false;
      this.selectedCategory = "0";
      this.location = "CurrentLocation";
      this.ebayData = {};
      this.submitClicked = false;
      this.clearPressed=true;
      this.resultService.clearResults();
      this.isResultsActive = true;
    });
  }


  toggle(isResults: boolean) {
    this.isResultsActive = isResults;
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