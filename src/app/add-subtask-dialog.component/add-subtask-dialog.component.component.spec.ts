import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtaskDialogComponent } from './add-subtask-dialog.component.component';

describe('AddSubtaskDialogComponentComponent', () => {
  let component: AddSubtaskDialogComponent;
  let fixture: ComponentFixture<AddSubtaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubtaskDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
