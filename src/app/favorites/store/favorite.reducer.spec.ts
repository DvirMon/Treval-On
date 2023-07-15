import { favoriteReducer } from "./favorite.reducer";
import { initialState } from "./favorite.state";

describe('Favorite Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = favoriteReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
