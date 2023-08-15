import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesListComponent } from './vacation-list.component';

describe('PlacesListComponent', () => {
  let component: PlacesListComponent;
  let fixture: ComponentFixture<PlacesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlacesListComponent]
    });
    fixture = TestBed.createComponent(PlacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
