import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetHttpServiceService {

  constructor(private http: HttpClient) { }

  sentRequestToAPI(cashName:string) {

    return this.http.get(`https://v1.nocodeapi.com/coyote/cx/gptJqoisckiySVtY/rates?source=${cashName}`);

  }
  
  

  
}
