import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import { vacationsFeatureKey, reducer, adapter } from './vacation.reducer';

export const vacationsFeature = createFeature({
  name: vacationsFeatureKey,
  reducer,
  extraSelectors: ({ selectVacationsState }) => ({
    ...adapter.getSelectors(selectVacationsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = vacationsFeature;
