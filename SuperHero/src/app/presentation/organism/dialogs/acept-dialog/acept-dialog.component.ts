import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-acept-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './acept-dialog.component.html',
  styleUrl: './acept-dialog.component.scss',
})
export class AceptDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogData = data;
    dialogRef.disableClose = true;
  }

  dialogData!: any;

  closeDialog() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
