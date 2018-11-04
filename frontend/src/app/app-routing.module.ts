import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { RssComponent } from './rss/rss.component';


const routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: CardComponent },
  { path: 'news', component: RssComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]

})
export class AppRoutingModule { }
