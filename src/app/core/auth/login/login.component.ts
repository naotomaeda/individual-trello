import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  public loginForm = new FormGroup({
    username: new FormControl('teste', [ Validators.required ]),
    password: new FormControl('teste', [ Validators.required ]),
  });

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private loadingService: LoadingService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    if (location.href.search('#token=') !== -1) {
      this.translateService.get('processing-login').pipe(take(1)).subscribe(
        translate => {
          this.loadingService.show(translate);
          const token = location.href.split('#token=')[1];
          this.authenticationService.saveTokenAndGetMember(token).then(
            () => {
              this.router.navigate(['/home']);
              this.loadingService.hide();
            },
            error => {
              console.log(error);
              this.loadingService.hide();
            }
          );
        }
      )
    } else {
      this.authenticationService.checkToken().then(() => this.router.navigate(['/home']));
    }
  }

  login() {
    this.authenticationService.getToken();
  }

  forgotPassword() {
    console.log('forgot password');
  }

}
