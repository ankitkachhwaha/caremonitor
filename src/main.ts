import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { authInterceptor } from './app/core/auth.interceptor';
import { BackendService } from './app/core/backend.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([BackendService, authInterceptor])
    ),
    provideAnimations(),
    ...appConfig.providers,
  ],
}).catch(err => console.error(err));
