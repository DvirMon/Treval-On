import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { FavoritesEffects } from './favorite.effects';


describe('FavoritesEffects', () => {
  let actions$: Observable<any>;
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
