import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    private readonly excludedUrls = ['/login'];

    constructor (private authService: AuthService){}

    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isExcludedUrl(req.url)) {
            return handler.handle(req);
        }
        
        const authToken = this.authService.getToken()
        if (!authToken){
            return handler.handle(req);
        }
        
        const newReq = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${authToken}`),
        });

        return handler.handle(newReq);
    }

    private isExcludedUrl(url: string): boolean {
        return this.excludedUrls.some(excluded => url.includes(excluded));
      }
}