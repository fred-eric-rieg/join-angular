import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwCardComponent } from './forgot-pw-card.component';

describe('ForgotPwCardComponent', () => {
  let component: ForgotPwCardComponent;
  let fixture: ComponentFixture<ForgotPwCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPwCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPwCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
