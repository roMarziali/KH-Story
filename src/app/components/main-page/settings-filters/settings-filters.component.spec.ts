import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFiltersComponent } from './settings-filters.component';

describe('SettingsFiltersComponent', () => {
  let component: SettingsFiltersComponent;
  let fixture: ComponentFixture<SettingsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
