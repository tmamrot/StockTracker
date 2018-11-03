import { Component, OnInit } from '@angular/core';
import {Rss} from '../rss';
import {RssService} from './rss-service.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {

  events: Rss[];

  constructor(private rssFeed: RssService) { }

  ngOnInit() {
    this.rssFeed.getFeed().subscribe((items: any) => {
    console.log(items);
    this.events = items;
    });
  }
}
