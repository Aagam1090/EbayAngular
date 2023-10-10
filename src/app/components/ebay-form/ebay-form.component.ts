import { Component } from '@angular/core';

@Component({
  selector: 'app-ebay-form',
  templateUrl: './ebay-form.component.html',
  styleUrls: ['./ebay-form.component.css']
})
export class EbayFormComponent {

  displayFormError = false;

  getData(data:any){
    data = data.form.value;
    if(data.keyword.trim().length==0){
      this.displayFormError = true;
    }
    console.log(data);
    console.log(this.displayFormError);

  }

}
