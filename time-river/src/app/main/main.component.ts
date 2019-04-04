import { Component, OnInit } from '@angular/core';
import { TimeRecordService } from '../time-record.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  dailyData: any;

  constructor(
    private timeRecordService: TimeRecordService,
  ) { }

  ngOnInit() {
    this.dailyData = this.timeRecordService.getDailyData();
  }

}
