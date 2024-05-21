import {STORAGE_KEY} from '../../constants/application.constant';
import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../../redux/actions/user.actions';

const initialAuthState = {
  user: '',
  authToken: localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN),
};

const userReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      const accessToken = action.payload.id;
      const user = action.payload;

      if (accessToken) {
        localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      }
      return {authToken: accessToken, user: user};
    }
    case USER_LOGGED_OUT: {
      localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
      return initialAuthState;
    }

    default:
      return state;
  }
};

export default userReducer;
