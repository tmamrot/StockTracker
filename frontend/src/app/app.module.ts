import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './card/card.component';
import { AppComponent } from './app.component';
import { StockService } from './card/stock.service';
import { FormsModule } from '@angular/forms';
import { RssComponent } from './rss/rss.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './card/nav/nav.component';
import { GraphComponent } from './graph/graph.component';
import { GraphService } from './graph/graph.service';
import { AppRoutingModule } from './/app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    RssComponent,
    DialogComponent,
    NavComponent,
    GraphComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [
    StockService,
    GraphService,
],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
