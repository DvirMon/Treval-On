import { Action } from "@ngrx/store";
import { initialState } from "./auth.state";
import { authReducer } from "./auth.reducer";

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = authReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
