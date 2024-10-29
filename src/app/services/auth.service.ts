import { Inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { DOCUMENT } from "@angular/common";
import { catchError, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authSecretKey = 'Token';
    private localStorage: Storage | undefined

    constructor(@Inject(DOCUMENT) private document: Document, private http: ConfigService) { 
        this.localStorage = this.document.defaultView?.localStorage;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post('login', {
          email: username,
          password: password
        }).pipe(
          map((response: any) => {
            const authToken = response.access;
            this.localStorage?.setItem(this.authSecretKey, authToken);
            return response;
          }),
          catchError((error) => {
            return error
          })
        );
      }

    isAuthenticatedUser(): boolean {
        const token: string | null = this.getToken()
        
        if (token){
            const jwtToken = JSON.parse( atob( token.split('.')[1] ) )
            return new Date(jwtToken.exp * 1000) > new Date()
        }

        return false
    }

    logout(): void {
        this.localStorage?.removeItem(this.authSecretKey);
    }

    getToken(): string | null{
        return this.localStorage?.getItem(this.authSecretKey) ?? null
    }
}