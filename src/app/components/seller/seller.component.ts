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
