import { Component, OnInit } from '@angular/core';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private graphs: GraphService) { }

  ngOnInit() {
  }

  GetGraphData() {
    this.graphs.GetHistory('alrm', '1y');
  }
}
