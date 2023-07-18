import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLinkFormComponent } from './email-link-form.component';

describe('EmailLinkFormComponent', () => {
  let component: EmailLinkFormComponent;
  let fixture: ComponentFixture<EmailLinkFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmailLinkFormComponent]
    });
    fixture = TestBed.createComponent(EmailLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
