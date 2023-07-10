import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpFormComponent } from './otp-form.component';

describe('OtpFormComponent', () => {
  let component: OtpFormComponent;
  let fixture: ComponentFixture<OtpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OtpFormComponent]
    });
    fixture = TestBed.createComponent(OtpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
