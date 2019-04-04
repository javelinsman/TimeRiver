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
    this.drawRectangles();
  }

  drawRectangles() {
    const rectangleWidth = 150, rectangleHeight = 650;
    const metaHeight = 70;

    this.container.attr('width', rectangleWidth * this.dailyData.length + 50).attr('height', metaHeight + rectangleHeight)

    const gDay = this.container.selectAll('g').data(this.dailyData).enter().append('g');
    gDay.attr('transform', (d, i) => translate(rectangleWidth * i, 0));
    const gDayBackgroundLayer = gDay.append('g');
    gDayBackgroundLayer.attr('transform', translate(0, metaHeight))
    const gDayBackgrounds = gDayBackgroundLayer.append('rect')
      .attr('width', rectangleWidth).attr('height', rectangleHeight)
      .classed('background', true)
    const gDayBackgroundTickLayer = gDayBackgroundLayer.append('g');
    const gDayTicks = gDayBackgroundTickLayer.selectAll('text').data(Array.from(Array(23)).map((_, i) => i + 1)).enter().append('g');
    gDayTicks
      .attr('transform', d => translate(0, d / 24 * rectangleHeight))
      .classed('timetick', true)
    gDayTicks.append('line')
      .attr('x1', 20).attr('x2', rectangleWidth / 2 - 10).attr('y1', 0).attr('y2', 0)
    gDayTicks.append('line')
      .attr('x1', rectangleWidth / 2 + 10).attr('x2', rectangleWidth - 20).attr('y1', 0).attr('y2', 0)
    const gDayTickTexts = gDayTicks.append('text');
    gDayTickTexts
      .attr('transform', d => translate(rectangleWidth / 2, 4))
      .attr('font-size', 12)
      .style('text-anchor', 'middle')
      .text(d => d);
    const gDayForegroundLayer = gDay.append('g');
    gDayForegroundLayer.attr('transform', translate(0, metaHeight))
    const gDayRects = gDayForegroundLayer.selectAll('rect').data(d => d.records).enter().append('rect');
    gDayRects.attr('transform', (d, i) => translate(0, rectangleHeight / 24 * d.from))
      .attr('width', rectangleWidth)
      .attr('height', d => rectangleHeight / 24 * (d.to - d.from))
      .classed('rectangle', true)
      .classed('research', d => d.tags.includes('연구'))
      .classed('joy', d => d.tags.includes('유흥'))
      .classed('sleep', d => d.tags.includes('잠'))
      .classed('personal', d => d.tags.includes('개인'))
      .classed('productivity', d => d.tags.includes('생산성'))
      .classed('nalida', d => d.tags.includes('날리다'))
      .classed('leisure', d => d.tags.includes('여가'))
      .classed('hcil', d => d.tags.includes('HCIL'))
      .classed('exceptional', d => d.tags.includes('예외'))
    const gDayTitles = gDayForegroundLayer.selectAll('text').data(d => d.records).enter().append('text');
    gDayTitles.attr('transform', (d, i) => translate(rectangleWidth / 2, rectangleHeight / 24 * (d.from + (d.to - d.from) / 2) + 6))
      .style('text-anchor', 'middle')
      .text(d => (d.to - d.from) >= 0.75 ? d.title: '')
    
      const gDayMeta = gDay.append('g').append('text');
      gDayMeta.attr('transform', translate(rectangleWidth / 2, metaHeight / 2))
        .style('text-anchor', 'middle')
        .text(d => d.title)

  }

}
