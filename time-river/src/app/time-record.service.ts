import { Injectable } from '@angular/core';
import { data } from './time-record-data';
import { colorData } from './time-record-color-data';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class TimeRecordService {
  data: any;
  colorData: any;
  colorPalette = [
    ...d3.schemeCategory10,
    ...d3.schemeAccent,
    ...d3.schemeSet1,
    ...d3.schemeSet2,
    ...d3.schemeSet3,
    ...d3.schemePastel1,
    ...d3.schemePastel2,
  ];
  defaultColor = '#dae0e5';

  constructor() {
    this.data = data;
    this.colorData = colorData;
  }

  getColorData() {
    return this.colorData.split('\n').filter(s => s.trim().length && !s.startsWith('#')).map(line => {
      const args = line.split(' ');
      const tagName = args[0].trim();
      const colorInd = +args[1] - 1;
      return [tagName, this.colorPalette[colorInd]];
    })
  }

  getDailyData() {
    return this.data.split('>').filter(s => s.trim().length).map(dayRaw => {
      const lines = dayRaw.split('\n').filter(s => s.trim().length);
      const records = lines.slice(1).map(taskRaw => {
        const args = taskRaw.split(' ');
        return {
          from: +args[0],
          to: +args[2],
          title: args[3],
          tags: args.slice(4),
        }
      })
      const title = lines[0];
      return { title, records };
    });
  }
}
