import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationCardButtonComponent } from './vacation-card-button.component';

describe('VacationCardButtonComponent', () => {
  let component: VacationCardButtonComponent;
  let fixture: ComponentFixture<VacationCardButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VacationCardButtonComponent]
    });
    fixture = TestBed.createComponent(VacationCardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
