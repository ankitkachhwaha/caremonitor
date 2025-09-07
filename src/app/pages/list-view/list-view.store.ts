import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppService,Item } from '../../service/app.service';

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class ItemsStore extends ComponentStore<ItemsState> {
   items = this.select(s => s.items);
   loading = this.select(s => s.loading);
   error = this.select(s => s.error);

  constructor(private api:AppService) {
    super({ items: [], loading: false, error: null });
  }

    load = this.effect((trigger: Observable<void>) =>
    trigger.pipe(
      switchMap(() => {
         console.log(trigger,'trigger items')
        this.patchState({ loading: true, error: null });
        return this.api.getItemApi().pipe(
          tap(items => this.patchState({ items, loading: false })),
         
          catchError(err => {
            this.patchState({
              error: err?.error?.message ?? 'Failed to load items.',
              loading: false,
            });
            return of([]);
          })
        );
      })
    )
  );
}

