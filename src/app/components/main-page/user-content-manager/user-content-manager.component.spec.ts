import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentManagerComponent } from './user-content-manager.component';

describe('UserComponentManagerComponent', () => {
  let component: UserContentManagerComponent;
  let fixture: ComponentFixture<UserContentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContentManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
