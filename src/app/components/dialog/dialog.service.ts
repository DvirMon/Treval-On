import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';

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
  public openDialog(component: ComponentType<unknown>, data: unknown): MatDialogRef<unknown, any> {
    return this.dialog.open(component, this._getConfig(data));
  }

  public openDynamicDialog(component: ComponentType<unknown>): MatDialogRef<DynamicDialogComponent, any> {

    const data = { componentType: component }
    const dialogConfig = this._getConfig(data)

    const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);

    return dialogRef

  }

  private _getConfig(data?: unknown): MatDialogConfig {

    const dialogConfig: MatDialogConfig = { ...this.dialogConfig }

    dialogConfig.data = data;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = "dialog"

    return dialogConfig
  }
}
