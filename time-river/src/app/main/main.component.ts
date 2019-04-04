import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TimeRecordService } from '../time-record.service';

import * as d3 from 'd3';
import { translate } from './utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  dailyData: any;
  container: any;

  @ViewChild('rectangles') rectanglesDiv: ElementRef<HTMLDivElement>;

  constructor(
    private timeRecordService: TimeRecordService,
  ) { }

  ngOnInit() {
    this.dailyData = this.timeRecordService.getDailyData();
    console.log(this.dailyData);
  }

  ngAfterViewInit() {
    this.container = d3.select(this.rectanglesDiv.nativeElement).append('svg');
    this.container.attr('width', 5000).attr('height', 1000)
    this.drawRectangles();
  }

  drawRectangles() {
    const rectangleWidth = 300, rectangleHeight = 650;

    const gDay = this.container.selectAll('g').data(this.dailyData).enter().append('g');
    gDay.attr('transform', (d, i) => translate(rectangleWidth * i, 0));
    const gDayBackgroundLayer = gDay.append('g');
    const gDayBackgrounds = gDayBackgroundLayer.append('rect');
    gDayBackgrounds
      .attr('width', rectangleWidth).attr('height', rectangleHeight)
      .classed('background', true)
    const gDayForegroundLayer = gDay.append('g');
    const gDayRects = gDayForegroundLayer.selectAll('rect').data(d => d).enter().append('rect');
    gDayRects.attr('transform', (d, i) => translate(0, rectangleHeight / 24 * d.from))
      .attr('width', rectangleWidth)
      .attr('height', d => rectangleHeight / 24 * (d.to - d.from))
      .classed('rectangle', true)
      .classed('highlighted', d => d.tags.includes('굳'))
    const gDayTitles = gDayForegroundLayer.selectAll('text').data(d => d).enter().append('text');
    gDayTitles.attr('transform', (d, i) => translate(rectangleWidth / 2, rectangleHeight / 24 * (d.from + (d.to - d.from) / 2)))
      .style('text-anchor', 'middle')
      .text(d => d.title)
  }

}
