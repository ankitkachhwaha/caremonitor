import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from './backend.service';
import { AppService } from '../service/app.service';

describe('AuthService', () => {
  let service: AppService;
  let cookies: CookieService;
  let auth : AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideHttpClient(withInterceptors([BackendService])),
        CookieService,
        AppService,
        AuthService
      ],
    });
    service = TestBed.inject(AppService);
    cookies = TestBed.inject(CookieService);
    auth = TestBed.inject(AuthService)
  });

  it('should login and set cookie', (done) => {
    service.login({ email: 'a@b.com', password: '123' }).subscribe(() => {
      expect(cookies.check('auth_token')).toBeTrue();
      done();
    });
  });

  it('should logout and remove cookie', () => {
    cookies.set('auth_token', 'abc');
    auth.logout();
    expect(cookies.check('auth_token')).toBeFalse();
  });
});
