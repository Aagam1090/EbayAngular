import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() item = {}; 

  ngDoCheck() {
    if(this.item != null && this.item != undefined && Object.keys(this.item).length != 0){
      console.log('item from results:', this.item);
    }
  }
}
