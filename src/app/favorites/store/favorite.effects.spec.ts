import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { FavoritesEffects } from './favorite.effects';
import { Actions } from '@ngrx/effects';


describe('FavoritesEffects', () => {
  let actions$: Observable<Actions>;
  let effects: FavoritesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FavoritesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
