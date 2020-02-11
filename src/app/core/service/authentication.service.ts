import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrentMemberModel } from '../../shared/trello/trello.model';
import { TrelloService } from 'src/app/shared/trello/trello.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(
        private loadingService: LoadingService,
        private trelloService: TrelloService,
        private translateService: TranslateService
    ) { }

    checkToken() {
        return new Promise((resolve, reject) => {
            const currentMember: CurrentMemberModel = JSON.parse(localStorage.getItem('currentMember'));
            if (currentMember) {
                if (currentMember.token) {
                  this.loadingService.show(this.translateService.instant('processing-login'));
                  this.saveTokenAndGetMember(currentMember.token).then(
                    () => {
                      this.loadingService.hide();
                      resolve();
                    }, error => {
                      this.loadingService.hide();
                      reject(error);
                    }
                  );
                }
            } else {
                reject('undefined token')
            }
        });
    }

    getToken() {
        let url = `${environment.urlAuthorizeToken}?`;
        url += `callback_method=fragment`;
        url += `&return_url=${environment.redirect_url}`;
        url += `&scope=read,write,account`;
        url += `&expiration=1day`;
        url += `&name=${environment.appName}`;
        url += `&key=${environment.apiKey}`;
        url += `&response_type=token`;
        location.href = url;
    }

    saveTokenAndGetMember(token: string) {
        return new Promise((resolve, reject) => {
            this.trelloService.getMemberFromToken(token).pipe(take(1)).subscribe(
                currentMember => {
                    currentMember.token = token;
                    localStorage.setItem("currentMember", JSON.stringify(currentMember));
                    this.trelloService.currentMemberValue = currentMember;
                    resolve();
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    logout() {
        localStorage.removeItem('currentMember');
        this.trelloService.currentMemberValue = null;
    }

    authorized() {
        return this.trelloService.currentMemberValue !== null &&
               this.trelloService.currentMemberValue !== undefined;
    }
}
