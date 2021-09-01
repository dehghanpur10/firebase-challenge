import { TestBed } from '@angular/core/testing';

import { AddRecordService } from './add-record.service';

describe('AddRecordService', () => {
  let service: AddRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
