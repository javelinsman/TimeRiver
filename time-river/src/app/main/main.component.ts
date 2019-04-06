import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TimeRecordService } from '../time-record.service';

import * as d3 from 'd3';
import { translate } from './utils';
import { StateService } from '../state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  dailyData: any;
  colorData: any;

  container: any;
  svg: any;

  showInfoWindow: boolean;
  showColorWindow: boolean;

  @ViewChild('rectangles') rectanglesDiv: ElementRef<HTMLDivElement>;

  constructor(
    private timeRecordService: TimeRecordService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.dailyData = this.timeRecordService.getDailyData();
    this.colorData = this.timeRecordService.getColorData();
    this.stateService.showInfoWindowObservable.subscribe(b => this.showInfoWindow = b);
    this.stateService.showColorWindowObservable.subscribe(b => this.showColorWindow = b);
    console.log(this.dailyData);
  }

  ngAfterViewInit() {
    this.container = d3.select(this.rectanglesDiv.nativeElement);
    this.svg = this.container.append('svg');
    this.onResize();
    this.container.property('scrollLeft', this.container.property('scrollWidth'));
    this.preventUnload();
  }

  preventUnload() {
    window.onbeforeunload = function (e) {
      var e = e || window.event;
      var msg = "Do you really want to leave this page?"
      // For IE and Firefox
      if (e) {
      e.returnValue = msg;
      }
      // For Safari / chrome
      return msg;
      };
  }

  onInfoUpdate() {
    this.dailyData = this.timeRecordService.getDailyData();
    this.drawRectangles();
  }

  onColorUpdate() {
    this.colorData = this.timeRecordService.getColorData();
    this.drawRectangles();
  }

  onResize() {
    this.svg.attr('height', window.innerHeight * 0.95 - 55);
    console.log(window.innerHeight);
    this.drawRectangles();
  }

  drawRectangles() {
    this.svg.selectAll('*').remove();

    const metaHeight = 40;
    const rectangleWidth = 150, rectangleHeight = this.svg.attr('height') - metaHeight;

    this.svg.attr('width', rectangleWidth * this.dailyData.length + 50);

    const gDay = this.svg.selectAll('g').data(this.dailyData).enter().append('g');
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
      .style('fill', d => {
        for (let i = this.colorData.length - 1; i >= 0; i-- ) {
          const tagName = this.colorData[i][0];
          const color = this.colorData[i][1];
          if (d.tags.includes(tagName)) {
            return color;
          }
        }
        return this.timeRecordService.defaultColor;
      })
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
