import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TrelloService } from 'src/app/shared/trello/trello.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private trelloService: TrelloService
    ) { }

    canActivate() {
        const currentMember = this.trelloService.currentMemberValue;
        if (currentMember) {
            this.trelloService.updateMember();
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
