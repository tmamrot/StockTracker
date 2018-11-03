import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Stock} from '../stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {

  }

GetCompanies() {

    return this.http.get('http://localhost:4200/stocks/userStock');
  }

getAllCompanies() {
  return this.http.get('http://localhost:4200/stocks/allStocks');
}

// pick up here, need to return stock object from backend, why hit backend if its just an api call?
getCompany(company: string) {
    return this.http.get('/stocks/single', {
    params: new HttpParams().set('symbol', company)});
}

}
