import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryParagraphFormComponent } from './story-paragraph-form.component';

describe('StoryParagraphFormComponent', () => {
  let component: StoryParagraphFormComponent;
  let fixture: ComponentFixture<StoryParagraphFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryParagraphFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryParagraphFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
