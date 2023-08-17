import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerHeaderComponent } from './divider-header.component';

describe('DividerHeaderComponent', () => {
  let component: DividerHeaderComponent;
  let fixture: ComponentFixture<DividerHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DividerHeaderComponent]
    });
    fixture = TestBed.createComponent(DividerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
