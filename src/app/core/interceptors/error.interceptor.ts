import { DialogService } from './../../shared/dialog/dialog.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService, 
        private dialogService: DialogService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log('401')
                this.authenticationService.logout();
                location.reload(true);
            }
            
            const errorMessage = err.error || err.statusText;
            // TODO formatar msg de erro

            this.dialogService.openDialog('Erro no servidor!');

            return throwError(err);
        }))
    }
}