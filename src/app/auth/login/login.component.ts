import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, LoginStatus } from './data-access/login.service';
import { LoginFormComponent } from './ui/login-form.component';
import { Credentials } from '../../shared/interfaces/credentials';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <app-login-form
      [loginStatus]="loginStatus"
      (login)="handleSubmit($event)"
    />
  `,
  styles: []
})
export default class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  loginStatus: LoginStatus = 'pending';

  handleSubmit(credentials: Credentials): void {
    this.loginService.login(credentials.email, credentials.password).subscribe(success => {
      if (success) {
        this.loginStatus = 'success';
        this.router.navigate(['/home']);
      } else {
        this.loginStatus = 'error';
      }
    });
  }
}
