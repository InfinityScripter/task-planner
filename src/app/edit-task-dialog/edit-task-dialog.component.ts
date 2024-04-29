import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import moment from "moment";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
})
export class EditTaskDialogComponent {
  dueDateControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}

  save(): void {
    this.dialogRef.close({
      title: this.data.title,
      dueDate: moment(this.dueDateControl.value).format('YYYY-MM-DD'),
      content: this.data.content,
    });
  }
}
