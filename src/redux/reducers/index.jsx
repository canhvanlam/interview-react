import {combineReducers} from 'redux';
import globalReducer from './global.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  globalLoading: globalReducer,
  auth: userReducer,
  global: globalReducer,
});

export default rootReducer;
