import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentVisibilityComponent } from './content-visibility.component';

describe('ContentVisibilityComponent', () => {
  let component: ContentVisibilityComponent;
  let fixture: ComponentFixture<ContentVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentVisibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
