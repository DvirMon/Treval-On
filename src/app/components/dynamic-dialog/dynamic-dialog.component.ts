import { ChangeDetectorRef, Component, ComponentRef, Inject, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// export i

@Component({
  selector: 'to-dynamic-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-template #dynamicContent></ng-template>`,
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent {

  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContentRef!: ViewContainerRef;

  constructor(
    private dialogRef: MatDialogRef<DynamicDialogComponent>,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { componentType: Type<any> }
  ) { }

  ngAfterViewInit() {
    // Create the dynamic component based on the input component type
    const componentFactory: Type<any> = this.data.componentType;

    const componentRef: ComponentRef<any> = this.dynamicContentRef.createComponent(componentFactory);

    // Set data to the dynamic component's input property (if needed)
    componentRef.instance.data = 'Some data to pass'; // Replace this with your actual data

    this.cdRef.detectChanges();

  }
}
