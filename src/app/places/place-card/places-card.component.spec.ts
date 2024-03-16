import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCardComponent } from './places-card.component';

describe('PlacesCardComponent', () => {
  let component: PlacesCardComponent;
  let fixture: ComponentFixture<PlacesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlacesCardComponent]
    });
    fixture = TestBed.createComponent(PlacesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
