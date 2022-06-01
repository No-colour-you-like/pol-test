import { combineReducers } from "redux";

import usersReducer from "./reducers/users";

const rootReducer = combineReducers({
  users: usersReducer
});

export default rootReducer;
