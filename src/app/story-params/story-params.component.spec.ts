import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryParamsComponent } from './story-params.component';

describe('StoryParamsComponent', () => {
  let component: StoryParamsComponent;
  let fixture: ComponentFixture<StoryParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
