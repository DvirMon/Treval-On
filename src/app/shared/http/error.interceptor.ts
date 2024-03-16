import {
  HttpErrorResponse,
  HttpInterceptorFn
} from "@angular/common/http";
import { catchError, throwError } from "rxjs";
// import { ERROR_MESSAGE_CONTEXT } from './error-message.context';
// import { MessageService } from '@app/shared/ui-messaging';

// const ERROR_MESSAGE_CONTEXT = new HttpContextToken(
//   () => "Sorry, something went wrong on our side."
// );

export const errorInterceptor: HttpInterceptorFn = (req, handle) => {
  // const uiMessage = inject(MessageService);

  return handle(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      // const errorMessageContext = req.context.get(ERROR_MESSAGE_CONTEXT);
      // uiMessage.error(errorMessageContext);
      return throwError(() => err);
    })
  );
};
