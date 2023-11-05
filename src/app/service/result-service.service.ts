import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {
  resultsData :any = [];
  constructor() { }

  addToResults(data:any){
    this.resultsData =  data;
    console.log("Data in Result Service",this.resultsData);
  }

  getResultsData(){
    return this.resultsData;
  }
  
  clearResults(){
    this.resultsData = [];
  }
}
