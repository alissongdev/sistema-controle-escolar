import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../interfaces/login-response';
import { Responsavel } from '../../../shared/interfaces/responsavel';
import { Monitor } from '../../../shared/interfaces/monitor';
import { responsavelMocks } from '../mocks/responsavelMocks';
import { monitorMocks } from '../mocks/monitorMocks';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);

  private apiURL = 'http://localhost:3000';

  fakeLoginMode = environment.fakeLoginMode;

  login(email: string, password: string): Observable<boolean> {
    if (this.fakeLoginMode) {
      return this.fakeLogin(email, password);
    }

    return this.http.post<LoginResponse>(`${this.apiURL}/login`, {
      email,
      password
    }).pipe(
      map(response => {
        if (response.success) {
          this.setLocalStorage(response.userType, response.userType === 'parent' ? response.responsavel : response.monitor);
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  private fakeLogin(email: string, password: string): Observable<boolean> {
    const users = [
      { email: 'maria@escola.com', password: 'maria123', userType: 'monitor', data: monitorMocks.monitorMaria },
      { email: 'alessandra@escola.com', password: 'alessandra123', userType: 'monitor', data: monitorMocks.monitorAlessandra },
      { email: 'joana@gmail.com', password: 'joana123', userType: 'parent', data: responsavelMocks.responsavelJoana },
      { email: 'fatima@gmail.com', password: 'fatima123', userType: 'parent', data: responsavelMocks.responsavelFatima }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setLocalStorage(user.userType, user.data);
      return of(true);
    } else {
      return of(false);
    }
  }

  private setLocalStorage(userType: string, data: any): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    if (userType === 'parent') {
      localStorage.setItem('responsavel', JSON.stringify(data));
    } else if (userType === 'monitor') {
      localStorage.setItem('monitor', JSON.stringify(data));
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getMonitor(): Monitor | null {
    const monitor = localStorage.getItem('monitor');
    return monitor ? JSON.parse(monitor) : null;
  }

  getResponsavel(): Responsavel | null {
    const responsavel = localStorage.getItem('responsavel');
    return responsavel ? JSON.parse(responsavel) : null;
  }

  isUserMonitor(): boolean {
    const userType = localStorage.getItem('userType');
    return userType ? userType === 'monitor' : false;
  }
}
