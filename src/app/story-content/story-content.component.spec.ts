import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryContentComponent } from './story-content.component';

describe('StoryContentComponent', () => {
  let component: StoryContentComponent;
  let fixture: ComponentFixture<StoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
