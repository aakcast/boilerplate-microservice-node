import { Catch, RpcExceptionFilter, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

/**
 * Exception Filter: reformatting RPC exceptions
 */
@Catch()
export class ExceptionFilter implements RpcExceptionFilter<Error> {
  catch(exception: Error): Observable<any> {
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;

    const message = exception.message;
    return throwError(() => ({
      code: 13, // INTERNAL
      message: `${statusCode} ${message}`,
    }));
  }
}
