import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  get isValidKeyword(): boolean {
    return ( this.keyword!= null && this.keyword != '' );
  }

  getData(form: NgForm): void {
    this.displayKeywordError = !this.validateKeyword(form.value.keyword);
    this.displayLocationError = !this.validateLocation(form.value.location, form.value.zip);
    
    if(this.displayKeywordError || this.displayLocationError) {
        return;
    }
    
    console.log('Form data submitted: ', form.value);
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
