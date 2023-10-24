import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent{
  @Input() singleItem: any = [];
  activeContent: string = 'Product'; 

  renderContent(content: string) {
    this.activeContent = content;
  }

  isActive(content: string): boolean {
    return this.activeContent === content;
  }
}
