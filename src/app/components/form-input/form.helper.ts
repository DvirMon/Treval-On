
export function getFormKeys(obj: object): string[] {
  return Object.keys(obj);
}

export enum FormErrorType {
    Required = "required",
    Pattern = "pattern",
    EmailPattern = "email",
  }
  
  
  