import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpResponse
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { CommonService } from '../../shared/services/common/common.service';

@Injectable()
export class CmsInterceptor implements HttpInterceptor {

    private requests: HttpRequest<any>[] = [];
    constructor(private service: CommonService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.service.session('get', 'Authorization') != null) {
            const token = this.service.session('get', 'Authorization');
            const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('x-api-key', 'dhyDNulWAg2NzBsLmw4Lc6Jl9EbQI37w5RWV39uF');
            const AuthRequest = request.clone({
                headers
            });

            this.service.loaderApiUrls.subscribe(data => {
                if (data.includes(request.url)) {
                    this.requests.push(AuthRequest);
                    this.service.isLoading.next(true);
                }
            });

            return new Observable(observer => {
                const subscription = next.handle(AuthRequest).subscribe((event): any => {
                    if (event instanceof HttpResponse) {
                        if (event.body.status == 403) {
                            this.service.logout();
                            return NEVER;
                        }
                        this.service.loaderApiUrls.subscribe(data => {
                            if (data.includes(request.url)) {
                                this.removeRequest(AuthRequest);
                            }
                        });
                        observer.next(event);
                    }
                }, err => {
                    this.service.loaderApiUrls.subscribe(data => {
                        if (data.includes(request.url)) {
                            this.removeRequest(AuthRequest);
                        }
                    });
                    observer.error(err);
                }, () => {
                    this.service.loaderApiUrls.subscribe(data => {
                        if (data.includes(request.url)) {
                            this.removeRequest(AuthRequest);
                        }
                    });
                    observer.complete();
                }
                );
                // teardown logic in case of cancelled requests
                return () => {
                    this.service.loaderApiUrls.subscribe(data => {
                        if (data.includes(request.url)) {
                            this.removeRequest(AuthRequest);
                        }
                    });
                    subscription.unsubscribe();
                };
            });
            // return next.handle(AuthRequest);
        } else {
            return next.handle(request);
        }
    }

    removeRequest(req: HttpRequest<any>) {
        this.service.loaderApiUrls.subscribe(data => {
            if (data.includes(req.url)) {
                data.slice(data.indexOf(req.url));
            }
        });
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.service.isLoading.next(this.requests.length > 0);
    }
}
