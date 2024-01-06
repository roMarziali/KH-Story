import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentTextComponent } from './segment-text.component';

describe('SegmentTextComponent', () => {
  let component: SegmentTextComponent;
  let fixture: ComponentFixture<SegmentTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegmentTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
