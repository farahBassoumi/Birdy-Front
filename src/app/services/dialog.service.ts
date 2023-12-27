import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../components/dialog-content/dialog-content.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(dialogConfig: any): void {
    this.dialog.open(DialogContentComponent, dialogConfig);
  }
  
}
