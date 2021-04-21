import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { tweetsReducer } from './tweetsReducer';
import { uiReducer } from './uiReducer';
import { viewUserReducer } from './viewUserReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  tweets: tweetsReducer,
  ui: uiReducer,
  viewUser: viewUserReducer,
});
