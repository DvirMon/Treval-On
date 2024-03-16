import { WritableSignal, signal } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";

export interface FormServerError {
  control: string;
  message: string;
}

export function getFormKeys(obj: FormGroup): WritableSignal<string[]> {
  return signal(Object.keys(obj.controls));
}

export enum FormErrorType {
  Required = "required",
  Pattern = "pattern",
  EmailPattern = "email",
  Server = "serverError",
}

export const errorMessageMap: ValidationErrors = {
  required: "required",
  pattern: "invalid pattern",
  email: "invalid email format",
};

export function handleServerError(
  group: FormGroup,
  server: FormServerError
): void {
  if (group !== null && server !== null) {
    const control = group.get(server.control as string);

    if (control != null) {
      control.setErrors({ serverError: server.message });
    }
  }
}
