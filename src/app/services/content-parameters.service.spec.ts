import { TestBed } from '@angular/core/testing';

import { ContentParametersService } from './content-parameters.service';

describe('ContentParametersService', () => {
  let service: ContentParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
