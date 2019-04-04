import { Injectable } from '@angular/core';
import { data } from './time-record-data';

@Injectable({
  providedIn: 'root'
})
export class TimeRecordService {
  data: any;

  constructor() { 
    this.data = data;
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
