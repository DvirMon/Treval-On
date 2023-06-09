import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationItemButtonComponent } from './vacation-item-button.component';

describe('VacationItemButtonComponent', () => {
  let component: VacationItemButtonComponent;
  let fixture: ComponentFixture<VacationItemButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VacationItemButtonComponent]
    });
    fixture = TestBed.createComponent(VacationItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
