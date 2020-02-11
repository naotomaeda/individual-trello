import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './service/authentication.service';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeService } from './service/theme.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { SidenavService } from './service/sidenav.service';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    SidenavComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidenavComponent
  ],
  providers: [
    AuthenticationService,
    ThemeService,
    SidenavService
  ],
  bootstrap: []
})
export class CoreModule { }
