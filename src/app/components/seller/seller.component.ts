import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  @Input() item:any;
  getStarColor(feedbackRatingStar: string): string {
    switch(feedbackRatingStar) {
      case 'Yellow': return '#FFD700';
      case 'Blue': return '#0000FF';
      case 'Turquoise': return '#40E0D0';
      case 'Purple': return '#800080';
      case 'Red': return '#FF0000';
      case 'Green': return '#008000';
      case 'Silver': return '#C0C0C0';
      default: return '#000000';
    }
  }
  
}
