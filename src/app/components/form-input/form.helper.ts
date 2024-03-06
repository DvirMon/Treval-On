import { FormGroup, ValidationErrors } from "@angular/forms";
import { ServerError } from "src/app/auth/store/auth.model";

export function getFormKeys(obj: FormGroup): string[] {
  return Object.keys(obj.controls);
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

export function handleServerError(group: FormGroup, server: ServerError): void {
  if (group !== null && server !== null) {
    const control = group.get(server.control as string);

    if (control != null) {
      control.setErrors({ serverError: server.message });
    }
  }
}
