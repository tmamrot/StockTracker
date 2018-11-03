import { Component, OnInit } from '@angular/core';
import {Stock} from './stock';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {
title: string;
stocks: Stock[];

// dependency injection
constructor() {

}
}



