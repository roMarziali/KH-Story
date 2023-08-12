import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponentManagerComponent } from './user-content-manager.component';

describe('UserComponentManagerComponent', () => {
  let component: UserComponentManagerComponent;
  let fixture: ComponentFixture<UserComponentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponentManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
