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
    return this.data.split('\n');
  }
}
