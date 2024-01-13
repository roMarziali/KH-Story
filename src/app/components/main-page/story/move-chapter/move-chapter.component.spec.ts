import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveChapterComponent } from './move-chapter.component';

describe('MoveChapterComponent', () => {
  let component: MoveChapterComponent;
  let fixture: ComponentFixture<MoveChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveChapterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoveChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
