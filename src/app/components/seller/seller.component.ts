import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  @Input() item:any;
  @Input() advanceitem:any;
  title = "";
  current = 0;
  max = 0;
  color = '#008000';
  radius = 30;
  ngOnChanges(){
    this.current = this.item.Seller.PositiveFeedbackPercent;
    this.max=100;
  }
  getStarDetails(feedbackScore: number): { color: string, icon: string } {
    let details = { color: '#000000', icon: 'star_border' }; 
    if (feedbackScore >= 10000) {
      details.icon = 'stars'; 
    }
    if (feedbackScore <= 9) {
      details.color = ''; 
    } else if (feedbackScore <= 49) {
      details.color = '#FFD700';
    } else if (feedbackScore <= 99) {
      details.color = '#0000FF'; 
    } else if (feedbackScore <= 499) {
      details.color = '#40E0D0'; 
    } else if (feedbackScore <= 999) {
      details.color = '#800080'; 
    } else if (feedbackScore <= 4999) {
      details.color = '#FF0000'; 
    } else if (feedbackScore <= 9999) {
      details.color = '#008000'; 
    } else if (feedbackScore >= 10000) {
      if (feedbackScore <= 24999) {
        details.color = '#FFD700'; 
      } else if (feedbackScore <= 49999) {
        details.color = '#40E0D0'; 
      } else if (feedbackScore <= 99999) {
        details.color = '#800080'; 
      } else if (feedbackScore <= 499999) {
        details.color = '#FF0000'; 
      } else if (feedbackScore <= 999999) {
        details.color = '#008000'; 
      } else {
        details.color = '#C0C0C0'; 
      }
    }
    return details;
  }
}
