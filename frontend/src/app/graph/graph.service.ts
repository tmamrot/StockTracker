import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) {

   }

   GetHistory(symbol: string, increment: string) {
     return this.http.get('http://localhost:4200/stocks/historicData/alrm/1y');
   }
}
