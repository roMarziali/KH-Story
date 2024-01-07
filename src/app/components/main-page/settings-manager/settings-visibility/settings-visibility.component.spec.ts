import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsVisibilityComponent } from './settings-visibility.component';

describe('SettingsVisibilityComponent', () => {
  let component: SettingsVisibilityComponent;
  let fixture: ComponentFixture<SettingsVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsVisibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
