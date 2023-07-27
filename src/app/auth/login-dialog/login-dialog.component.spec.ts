import { ComponentFixture, TestBed } from '@angular/core/testing';

import { openLoginDialogComponent } from './login-dialog.component';

describe('openLoginDialogComponent', () => {
  let component: openLoginDialogComponent;
  let fixture: ComponentFixture<openLoginDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [openLoginDialogComponent]
    });
    fixture = TestBed.createComponent(openLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
