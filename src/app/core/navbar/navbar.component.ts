import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../service/theme.service';
import { SidenavService } from '../service/sidenav.service';
import { TrelloService } from 'src/app/shared/trello/trello.service';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    public theme: ThemeService,
    public sidenavService: SidenavService,
    public trelloService: TrelloService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  changeTheme(theme) {
    this.theme.changeTheme(theme);
  }

  toogleSidenav() {
    this.sidenavService.toggle();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }

}
