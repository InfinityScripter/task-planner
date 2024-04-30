import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subtask-dialog',
  templateUrl:  'add-subtask-dialog.component.component.html',
  styles: [
    `.full-width { width: 100%; }`
  ]
})
export class AddSubtaskDialogComponent {
  subtaskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSubtaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.subtaskForm = new FormGroup({
      title: new FormControl(this.data?.title || '', Validators.required),
      dueDate: new FormControl(this.data?.dueDate || '', Validators.required),
      content: new FormControl(this.data?.content || '', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
