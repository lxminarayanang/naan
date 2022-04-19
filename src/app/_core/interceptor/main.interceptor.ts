import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { CommonService } from '@shared/services/common/common.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private service: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = sessionStorage.getItem('authtoken');

    if (token) {

      request = request.clone({

        setHeaders: { Authorization: "Bearer "+token }

      });

    }

    return new Observable(observer => {

      const subscription = next.handle(request).subscribe((event):any => {
        
        if (event instanceof HttpResponse) {

          if (event.body.status == 403) {

            this.service.logout();

            return NEVER;

          }

          observer.next(event);

        }
      }, (err): any => {
        
        if (err.status == 403) {

          this.service.logout();

          return NEVER;

        }

        return observer.error(err);
        

      }, () => {

        observer.complete();

      });

      return () => {
        
        subscription.unsubscribe();

      };

    });

  }

}
