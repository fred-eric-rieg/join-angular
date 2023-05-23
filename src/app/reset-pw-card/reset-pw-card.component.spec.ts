import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwCardComponent } from './reset-pw-card.component';

describe('ResetPwCardComponent', () => {
  let component: ResetPwCardComponent;
  let fixture: ComponentFixture<ResetPwCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPwCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPwCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
