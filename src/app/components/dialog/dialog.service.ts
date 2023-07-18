import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) private dialogConfig: MatDialogConfig
  ) { }

  // open spinner dialog
  public openDialog(component: ComponentType<unknown>, data: unknown) {
    return this.dialog.open(component, this._getConfig(data));
  }

  private _getConfig(data? : unknown): MatDialogConfig {

    const dialogConfig = { ...this.dialogConfig }

    dialogConfig.data = data;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = "dialog"

    return dialogConfig
  }
}
