import {
  createAction,
  props,
} from '@ngrx/store';

/**
 * Action to login.
 */
export const login = createAction(
  'Login',
  props<{ email: string }>()
);

/**
 * Action to logout
 */
export const logout = createAction(
  'Logout',
);
