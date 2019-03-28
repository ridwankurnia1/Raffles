/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransService } from './trans.service';

describe('Service: Trans', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransService]
    });
  });

  it('should ...', inject([TransService], (service: TransService) => {
    expect(service).toBeTruthy();
  }));
});
