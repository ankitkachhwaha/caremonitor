import {
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

const MOCK_DELAY = 600;
export const BackendService: HttpInterceptorFn = (req, next) => {
  const { url, method, body, headers } = req;

  const handle = (): Observable<HttpEvent<unknown>> => {
    // LOGIN
    if (url.endsWith('/api/login') && method === 'POST') {
      const { email, password } = body as any;
      if (email && password) {
        const token = 'jwt-token-' + Math.random().toString(36).slice(2);
        // set cookie
        document.cookie = `auth_token=${token}; Path=/; SameSite=Lax`;

        return ok({
          success: true,
          token,
          user: { email },
          message: 'Login successful (token set in cookie)',
        });
      }
      return badRequest('Email and password are required.');
    }

    // ITEMS
    if (url.endsWith('/api/items') && method === 'GET') {
      const cookie = document.cookie || '';
      if (!cookie.includes('auth_token=jwt-token-')) {
        return unauthorized();
      }

      const items = Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        name: `Item #${i + 1}`,
        description: `This is item number ${i + 1} from the API.`,
      }));
      return ok(items);
    }

    // Passthrough
    return next(req);
  };

  return of(null).pipe(delay(MOCK_DELAY), mergeMap(handle));
};

function ok(body: unknown) {
  return of(new HttpResponse({ status: 200, body }));
}
function badRequest(message: string) {
  return throwError(() => ({ status: 400, error: { message } }));
}
function unauthorized() {
  return throwError(() => ({
    status: 401,
    error: { message: 'Unauthorized' },
  }));
}
