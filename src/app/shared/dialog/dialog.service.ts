import { ComponentType } from "@angular/cdk/portal";
import { Inject, Injectable } from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) private dialogConfig: MatDialogConfig
  ) {}


  // open spinner dialog
  public openDialog<T>(
    component: ComponentType<T>,
    data: unknown
  ): MatDialogRef<T, unknown> {
    return this.dialog.open<T>(component, this._getConfig(data));
  }


  private _getConfig(data?: unknown): MatDialogConfig {
    const dialogConfig: MatDialogConfig = { ...this.dialogConfig };

    dialogConfig.data = data;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = "dialog";

    return dialogConfig;
  }
}
