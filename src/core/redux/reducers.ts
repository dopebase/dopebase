import { combineReducers } from "redux";
import { authReducer } from "../../modules/auth/redux";
export default combineReducers({
  auth: authReducer,
});
