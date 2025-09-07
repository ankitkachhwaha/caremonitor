import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item { id: number; name: string; description: string; }

@Injectable({ providedIn: 'root' })
export class AppService {
  private http = inject(HttpClient);

  getItemApi() {
   return this.http.get<Item[]>('/api/items', {
      withCredentials: true 
    });
  }

login(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post('/api/login', credentials, { withCredentials: true });
}
}
