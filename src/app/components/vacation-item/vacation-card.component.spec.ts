import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationCardComponent } from './vacation-card.component';

describe('VacationCardComponent', () => {
  let component: VacationCardComponent;
  let fixture: ComponentFixture<VacationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VacationCardComponent]
    });
    fixture = TestBed.createComponent(VacationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
