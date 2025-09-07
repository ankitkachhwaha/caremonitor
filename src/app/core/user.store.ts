import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface UserState {
  email: string | null;
  token: string | null;
}

@Injectable({ providedIn: 'root' })
export class UserStore extends ComponentStore<UserState> {
   email = this.select(s => s.email);

  constructor() {
    super({ email: null, token: null });
  }

   setUser = this.updater<{ email: string; token: string }>((state, user) => ({
    ...state, email: user.email, token: user.token
  }));

   clear = this.updater((state) => ({ ...state, email: null, token: null }));
}
