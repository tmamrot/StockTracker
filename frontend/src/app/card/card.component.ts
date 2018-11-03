import { Component, Inject, OnInit } from '@angular/core';
import { StockService } from './stock.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Stock} from '../stock';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  stocks: any[] = [];
  readOnlyStocks: Stock[] = [];

  constructor(private stockService: StockService, private dialog: MatDialog) { }

  ngOnInit() {
    this.stockService.GetCompanies().subscribe((companies: Stock[]) => {
      this.stocks = companies;
      this.readOnlyStocks = companies;
    });

  }

  Filter(filter: any) {

    this.stocks = [];

    for (let i = 0; i < this.readOnlyStocks.length; i++) {
      if (this.readOnlyStocks[i].name.indexOf(filter.target.value) > -1 ||
       this.readOnlyStocks[i].symbol.indexOf(filter.target.value) > -1) {
        this.stocks.push(this.readOnlyStocks[i]);
      }
    }
  }

  openDialog() {

    console.log('Dialog Button Clicked!');

    this.dialog.open(DialogComponent, {
    });
  }

}

// Diaglog Box component used to add stocks to the screen.
@Component({
  selector: 'app-dialog-box',
  templateUrl: '../dialog/app-dialog.html',
  styleUrls: ['../dialog/app-dialog.css']
})

export class DialogComponent implements OnInit {
  stocks: any[] = [];
  readOnlyStocks: Stock[] = [];


  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getAllCompanies().subscribe((companies: Stock[]) => {
      this.readOnlyStocks = companies;
    });

  }

  OnKey(filter: any) {

    this.stocks = [];

    for (let i = 0; i < this.readOnlyStocks.length; i++) {
        if (this.readOnlyStocks[i].name.indexOf(filter.target.value) > -1 ||
         this.readOnlyStocks[i].symbol.indexOf(filter.target.value) > -1) {
          this.stocks.push(this.readOnlyStocks[i]);
        }
    }
  }

  // pick back up here. need to return stock objec to add to
  // the other component's readonly array to display on screen.
  // also need to move this component out of this file and into its own.
  add(stock: any) {

    console.log('STOCK: ' + stock);
    this.stockService.getCompany(stock);
  }
}

