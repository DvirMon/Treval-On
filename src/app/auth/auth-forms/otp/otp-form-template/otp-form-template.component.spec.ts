import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpFormTemplateComponent } from './otp-form-template.component';

describe('OtpFormTemplateComponent', () => {
  let component: OtpFormTemplateComponent;
  let fixture: ComponentFixture<OtpFormTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OtpFormTemplateComponent]
    });
    fixture = TestBed.createComponent(OtpFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
