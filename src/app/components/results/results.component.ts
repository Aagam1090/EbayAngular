import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() item :any = []; 
  @Input() isDataLoaded :boolean = false;

  ngDoCheck(){
    console.log('this.item:', this.item);
    console.log('this.isDataLoaded:', this.isDataLoaded);
  }

  ngAfterContentChecked(){
    this.isEmptyObject(this.item);
  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  getValue(item: any, key: string[]): string | number {
    let current = item;
    for (const k of key) {
      if (!current[k]) return "N/A";
      current = current[k];
    }
    return current;
  }

}

interface Item {
  url: string;
  data: any; // You can make this more specific if you know the structure
  totalEntries: number;
}
