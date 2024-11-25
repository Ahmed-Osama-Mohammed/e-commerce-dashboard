import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';  
import { MatDialogModule } from '@angular/material/dialog';  
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,  
  imports: [
    CommonModule,    
    MatDialogModule, 
    MatButtonModule  
  ],
  template: `
    <h2 mat-dialog-title>Confirm Deletion</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button color="warn" (click)="onConfirm()">Delete</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
