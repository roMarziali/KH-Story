import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorySectionFormComponent } from './story-section-form.component';

describe('StorySectionFormComponent', () => {
  let component: StorySectionFormComponent;
  let fixture: ComponentFixture<StorySectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorySectionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorySectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
