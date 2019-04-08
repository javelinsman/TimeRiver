import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import base64url from 'base64url';
import * as jsonUrl from 'json-url';
import 'json-url/dist/browser/json-url-msgpack';
import 'json-url/dist/browser/json-url-lzw';
import 'json-url/dist/browser/json-url-lzma';
import 'json-url/dist/browser/json-url-lzstring';
import 'json-url/dist/browser/json-url-safe64';
import { TimeRecordService } from '../time-record.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private timeRecordService: TimeRecordService,
  ) { }

  ngOnInit() {
  }

  showInfoWindow() {
    this.stateService.showColorWindow = false;
    this.stateService.showInfoWindow = !this.stateService.showInfoWindow;
  }

  showColorWindow() {
    this.stateService.showInfoWindow = false;
    this.stateService.showColorWindow = !this.stateService.showColorWindow;
  }

  showSaveWindow() {
    const data = {
      dailyData: this.timeRecordService.data,
      colorData: this.timeRecordService.colorData,
    };
    const encodedData = jsonUrl('lzw').compress(data).then(result => console.log('compressed:', result)).catch(e => console.log(e));
  }

  changeExampleData() {
  }

}
