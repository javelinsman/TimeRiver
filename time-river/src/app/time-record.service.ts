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

  infoErrorMessage: string;

  constructor() {
    this.data = data;
    this.colorData = colorData;
  }

  getColorData() {
    return this.colorData.split('\n').filter(s => s.trim().length && !s.startsWith('/')).map(line => {
      const args = line.split(' ');
      const tagName = args[0].trim();
      const colorInd = +args[1] - 1;
      return [tagName, this.colorPalette[colorInd]];
    })
  }

  getDailyData() {
    this.infoErrorMessage = null;
    return this.data.split('>').filter(s => s.trim().length).map(dayRaw => {
      const lines = dayRaw.split('\n').filter(s => s.trim().length);
      const records = lines.slice(1).map(taskRaw => {
        const pattern = /\s*(?<from>[\d\.]+)\s*~\s*(?<to>[\d\.]+)\s*(?<content>[^#]+)\s*(?<tags>(#\S+\s*)*)*/;
        const match = taskRaw.match(pattern);
        if (match) {
          const { from, to, content, tags } = match.groups;
          if (+from > +to) {
            this.infoErrorMessage = `시간을 다시 확인해주세요: ${taskRaw}`;
            return null;
          }
          return {
            from: +from,
            to: +to,
            title: content.trim(),
            tags: tags ? tags.split(' ').map(d => d.trim()).filter(d => d.startsWith('#')).map(d => d.slice(1)) : []
          }
        } else {
          return null;
        }
      }).filter(d => d);
      const title = lines[0].trim();
      return { title, records };
    });
  }
}
