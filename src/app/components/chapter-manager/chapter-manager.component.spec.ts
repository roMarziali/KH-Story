import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterManagerComponent } from './chapter-manager.component';

describe('ChapterManagerComponent', () => {
  let component: ChapterManagerComponent;
  let fixture: ComponentFixture<ChapterManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
