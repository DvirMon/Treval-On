import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  Signal,
  inject,
  input,
  runInInjectionContext,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Observable, map, startWith } from "rxjs";
import { FormErrorType } from "./form.helper";

@Component({
  selector: "to-form-input",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: "./form-input.component.html",
  styleUrls: ["./form-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent implements OnInit {
  private readonly _injector: Injector = inject(Injector);

  control = input.required<AbstractControl<unknown, unknown> | null>();
  key = input.required<string>();
  type = input<string>();
  label = input<string>();
  hint = input<string>();

  formControl!: FormControl;
  errorMessage!: Signal<string | undefined>;
  hasError!: Signal<boolean>;

  ngOnInit(): void {
    this.formControl = this.control() as FormControl;

    this.errorMessage = this.setErrorMessageSignal(
      this.formControl,
      this.key()
    );
    this.hasError = this.setHasErrorSignal();
  }

  setErrorMessageSignal(formControl: FormControl, key: string): Signal<string> {
    return runInInjectionContext(this._injector, () =>
      toSignal(this.setErrorObservable(formControl, key), {
        initialValue: this._getErrorMessage(formControl, key),
      })
    );
  }

  setErrorObservable(
    formControl: FormControl,
    key: string
  ): Observable<string> {
    return formControl.statusChanges.pipe(
      map(() => this._getErrorMessage(formControl, key))
    );
  }

  setHasErrorSignal(): Signal<boolean> {
    return runInInjectionContext(this._injector, () =>
      toSignal(this.setHasErrorObservable(this.formControl), {
        initialValue: false,
      })
    );
  }

  setHasErrorObservable(formControl: FormControl): Observable<boolean> {
    return formControl.statusChanges.pipe(
      startWith(formControl.status),
      map(() => formControl.errors),
      map((errors: ValidationErrors | null) => !!errors)
    );
  }

  // handle input error messages
  private _getErrorMessage(
    control: FormControl | AbstractControl,
    key: string
  ): string {
    if (control.hasError(FormErrorType.Required)) {
      return `${key} is required`;
    }

    if (control.hasError(FormErrorType.EmailPattern)) {
      return `invalid ${key} format`;
    }

    return "";
  }
}
