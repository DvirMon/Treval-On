import { HttpInterceptorFn } from "@angular/common/http";

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone());
};
