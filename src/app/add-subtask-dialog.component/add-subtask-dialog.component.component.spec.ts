import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtaskDialogComponentComponent } from './add-subtask-dialog.component.component';

describe('AddSubtaskDialogComponentComponent', () => {
  let component: AddSubtaskDialogComponentComponent;
  let fixture: ComponentFixture<AddSubtaskDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubtaskDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubtaskDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
