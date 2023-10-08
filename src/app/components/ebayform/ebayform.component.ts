import { Component } from '@angular/core';
import { from } from 'rxjs';

interface FormData {
  keyword?: string;
  category?: string;
  condition?: string;
  shipping?: string;
  distance?: BigInteger;
  from?: string;
  zipcode?: BigInteger;
}

@Component({
  selector: 'app-ebayform',
  templateUrl: './ebayform.component.html',
  styleUrls: ['./ebayform.component.css']
})
export class EbayformComponent {
  formData: FormData = {};

  onSubmit(event: Event) {
    event?.preventDefault();
    console.log('Form Data:', this.formData);
  }

  onClear() {
    this.formData = {};
  }
}
