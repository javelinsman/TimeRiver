import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TimeRecordService } from '../time-record.service';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  updateTimestamp: number;

  @Output() update = new EventEmitter();

  @ViewChild('data') textarea: ElementRef<HTMLTextAreaElement>;

  constructor(
    public timeRecordService: TimeRecordService,
  ) { }

  ngOnInit() {
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
