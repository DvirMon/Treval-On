import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogComponent } from './dynamic-dialog.component';

describe('DynamicDialogComponent', () => {
  let component: DynamicDialogComponent;
  let fixture: ComponentFixture<DynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicDialogComponent]
    });
    fixture = TestBed.createComponent(DynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
