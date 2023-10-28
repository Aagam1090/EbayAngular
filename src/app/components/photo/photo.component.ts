import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  
  @Input() item: any = [];
  photosData: any = [];
  
  constructor(private http: HttpClient) { }

  ngOnChanges() {
    this.fetchPhotos(this.item.title).subscribe(response => {
      this.photosData = response;
      console.log('singleItemData API Data',this.photosData);
    });
  }

  fetchPhotos(title:string){
    return this.http.get('http://localhost:3000/photos?title='+title);
  }
}
