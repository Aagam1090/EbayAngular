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
  modifiedPhotosData: any[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnChanges() {
    this.fetchPhotos(this.item.Title).subscribe(response => {
      this.photosData = response;
      console.log('PhotosData API Data',this.photosData);
      this.loopImages();
      this.modifiedPhotosData = [...this.photosData];
      if (this.modifiedPhotosData.length > 6) {
        this.modifiedPhotosData.splice(6, 0, null);
      }
    }); 
  }

  loopImages(){
    for(let i=0;i<this.photosData.length;i++){
      console.log(this.photosData[i].link);
    }
  }

  fetchPhotos(title:string){
    return this.http.get('http://localhost:3000/photos?title='+title);
  }
}
