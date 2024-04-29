import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import moment from "moment";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
})
export class EditTaskDialogComponent {
  titleControl = new FormControl('', Validators.required);
  dueDateControl = new FormControl('', Validators.required);
  contentControl = new FormControl('', Validators.required);
  formInvalid = false;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; dueDate: string; content: string }
  ) {
    this.titleControl.setValue(data.title);
    this.dueDateControl.setValue(data.dueDate);
    this.contentControl.setValue(data.content);
  }

  save(): void {
    if (this.titleControl.valid && this.dueDateControl.valid && this.contentControl.valid) {
      this.dialogRef.close({
        title: this.titleControl.value,
        dueDate: moment(this.dueDateControl.value).format('YYYY-MM-DD'),
        content: this.contentControl.value,
      });
    } else {
      this.formInvalid = true;
    }
  }
}
