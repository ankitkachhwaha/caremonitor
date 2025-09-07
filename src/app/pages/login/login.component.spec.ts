import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from '../../core/backend.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LoginComponent],
      providers: [
        provideHttpClient(withInterceptors([BackendService])),
        CookieService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should show error when invalid login attempted', () => {
    component.form.patchValue({ email: '', password: '' });
    component.submit();
    expect(component.error()).toContain('Login');
  });
});
