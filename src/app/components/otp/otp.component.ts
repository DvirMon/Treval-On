import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'to-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit, AfterViewInit {

  @ViewChildren('input') inputsList!: QueryList<ElementRef<HTMLInputElement>>;

  @Input() otpLength: number = 5;

  protected readonly otpLengthArray!: number[];
  protected readonly otpForm!: FormGroup;
  protected focusedIndex = 0;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {

    this.otpForm = this.initializeForm();
    this.otpLengthArray = this.generateOtpLengthArray();
    this.subscribeToFormChanges();

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.focusOnFirstInput();
  }

  private initializeForm(): FormGroup<{
    [x: string]: FormControl<[string, Validators[]] | null>;
  }> {
    const controlsConfig: Record<string, [string, Validators[]]> = {};
    for (let i = 0; i < this.otpLength; i++) {
      controlsConfig[`digit${i}`] = ['', [Validators.required]];
    }
    return this.formBuilder.group(controlsConfig);
  }

  private generateOtpLengthArray(): number[] {
    return Array.from({ length: this.otpLength }, (_, i) => i);
  }

  private subscribeToFormChanges(): void {
    this.otpForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.isCodeComplete()) {
        this.executeHttpRequest();
      }
    });
  }


  protected onKeyDown(event: KeyboardEvent, index: number): void {

    const currentValue = (event.target as HTMLInputElement).value;
    const nextIndex = index + 1;
    const isNumberKey = /^[0-9]$/.test(event.key);

    if (currentValue && isNumberKey && nextIndex < this.otpLength) {
      const nextInput = this.inputsList.toArray()[nextIndex].nativeElement as HTMLInputElement;
      // nextInput.value = currentValue;
      nextInput.focus();
      this.focusedIndex = nextIndex;
    }
  }

  private isCodeComplete(): boolean {
    return this.otpForm.valid;
  }

  private executeHttpRequest(): void {
    console.log('Executing HTTP request with OTP:', this.getOtpDigits().join(''));
    // Implement your HTTP request logic here
  }

  private getOtpDigits(): string[] {
    const digits = Object.keys(this.otpForm.controls)
      .sort()
      .map((key) => this.otpForm.controls[key].value);
    return digits;
  }

  private focusOnFirstInput(): void {
    if (this.inputsList && this.inputsList.length > 0) {
      const firstInput = this.inputsList.first.nativeElement as HTMLInputElement;
      this.renderer.selectRootElement(firstInput).focus();
    }
  }
}
