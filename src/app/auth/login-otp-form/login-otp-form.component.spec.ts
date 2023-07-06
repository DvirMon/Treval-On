import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtpFormComponent } from './login-otp-form.component';

describe('LoginOtpFormComponent', () => {
  let component: LoginOtpFormComponent;
  let fixture: ComponentFixture<LoginOtpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginOtpFormComponent]
    });
    fixture = TestBed.createComponent(LoginOtpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
