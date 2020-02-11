import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconRegistryService } from './core/service/icon-registry.service';
import { ThemeService } from './core/service/theme.service';
import { AuthenticationService } from './core/service/authentication.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'starter-material';

  constructor(
    private translate: TranslateService,
    private iconRegistry: IconRegistryService,
    public themeService: ThemeService,
    public authenticationService: AuthenticationService,
    public router: Router,
    private mediaMatcher: MediaMatcher
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
    this.iconRegistry.registerIcons();
  }
}
