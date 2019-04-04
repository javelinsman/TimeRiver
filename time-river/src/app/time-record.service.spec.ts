import { TestBed } from '@angular/core/testing';

import { TimeRecordService } from './time-record.service';

describe('TimeRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeRecordService = TestBed.get(TimeRecordService);
    expect(service).toBeTruthy();
  });
});
