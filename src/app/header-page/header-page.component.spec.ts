import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderPageComponent } from './header-page.component';

describe('HeaderComponent', () => {
  let component: HeaderPageComponent;
  let fixture: ComponentFixture<HeaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
