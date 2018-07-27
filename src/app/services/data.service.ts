import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from "rxjs/operators";

@Injectable()
export class DataService {

  constructor(public http:Http) {
      console.log('Data service is connected..');
   }

   getPhotos(){
     return this.http.get('http://jsonplaceholder.typicode.com/photos')
     .pipe(map(resp => resp.json()));
   }

}
