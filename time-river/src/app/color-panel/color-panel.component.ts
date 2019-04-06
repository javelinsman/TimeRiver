import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TimeRecordService } from '../time-record.service';

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {
  updateTimestamp: number;
  palette: any;

  @Output() update = new EventEmitter();

  @ViewChild('data') textarea: ElementRef<HTMLTextAreaElement>;

  constructor(
    public timeRecordService: TimeRecordService,
  ) { }

  ngOnInit() {
    this.palette = this.timeRecordService.colorPalette;
  }
  onDataChange() {
    const timestamp = Date.now();
    this.updateTimestamp = timestamp;
    setTimeout(() => {
      if (this.updateTimestamp == timestamp) {
        this.update.emit(this.textarea.nativeElement.value);
      }
    }, 1000)
  }


}
