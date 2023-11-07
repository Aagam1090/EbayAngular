import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

  // baseURL = 'http://localhost:3000';
  baseURL = 'https://web-tech-asg-3.wl.r.appspot.com/';
  
  @Input() item: any = [];
  photosData: any = [];
  modifiedPhotosData: any[] = [];
  photosLoaded: boolean = false;
  
  constructor(private http: HttpClient) { }

  ngOnChanges() {
    this.fetchPhotos(this.item.Title).subscribe(response => {
      this.photosData = response;
      this.photosLoaded = true;
      console.log('PhotosData API Data',this.photosData);
      if(this.photosData){
        this.modifiedPhotosData = [...this.photosData];
      if (this.modifiedPhotosData.length > 6) {
        this.modifiedPhotosData.splice(6, 0, null);
        }
      }
    }); 
  }

  fetchPhotos(title:string){
    return this.http.get(this.baseURL+'/photos?title='+title);
  }
}
