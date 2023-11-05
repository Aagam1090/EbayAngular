import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  @Input() item:any;
  current = 0;
  max = 0;
  color = '#008000';
  radius = 30;
  ngOnChanges(){
    this.current = this.item.Seller.PositiveFeedbackPercent;
    this.max=100;
  }
  getStarDetails(feedbackScore: number): { color: string, icon: string } {
    console.log(feedbackScore);
    let details = { color: '#000000', icon: 'star_border' }; // default values
  
    if (feedbackScore >= 10000) {
      details.icon = 'stars'; // use filled star for scores 10000 and above
    }
  
    if (feedbackScore <= 9) {
      details.color = ''; // No color for score 0-9, and no icon should be displayed
    } else if (feedbackScore <= 49) {
      details.color = '#FFD700'; // Yellow Star
    } else if (feedbackScore <= 99) {
      details.color = '#0000FF'; // Blue Star
    } else if (feedbackScore <= 499) {
      details.color = '#40E0D0'; // Turquoise Star
    } else if (feedbackScore <= 999) {
      details.color = '#800080'; // Purple Star
    } else if (feedbackScore <= 4999) {
      details.color = '#FF0000'; // Red Star
    } else if (feedbackScore <= 9999) {
      details.color = '#008000'; // Green Star
    } else if (feedbackScore >= 10000) {
      // For scores 10000 and above, already set the icon to 'star'
      if (feedbackScore <= 24999) {
        details.color = '#FFD700'; // Yellow Shooting Star
      } else if (feedbackScore <= 49999) {
        details.color = '#40E0D0'; // Turquoise Shooting Star
      } else if (feedbackScore <= 99999) {
        details.color = '#800080'; // Purple Shooting Star
      } else if (feedbackScore <= 499999) {
        details.color = '#FF0000'; // Red Shooting Star 245790
      } else if (feedbackScore <= 999999) {
        details.color = '#008000'; // Green Shooting Star
      } else {
        details.color = '#C0C0C0'; // Silver Shooting Star
      }
    }
    console.log(details);
    return details;
  }
  
  getOverlayStyle() {
    const isSemi = false;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      fontSize: this.radius / 3.5 + 'px',
    };
  }
  
}
