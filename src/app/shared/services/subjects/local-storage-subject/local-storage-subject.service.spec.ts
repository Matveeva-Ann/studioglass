import { TestBed } from '@angular/core/testing';

import { LocalStorageSubjectService } from './local-storage-subject.service';

describe('LocalStorageSubjectService', () => {
  let service: LocalStorageSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
