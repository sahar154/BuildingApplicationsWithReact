import * as types from "../actions/actionTypes";
import storeInitialStae from "./StoreInitialStae";
// helper to check if the action type ends with the word success.
// thunk diapatch action ends with sucess after each api calls.
function actionTypeEndsinSucess(type) {
  return type.substring(type.length - 8) == "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = storeInitialStae.apiCallInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndsinSucess(action.type)) {
    return state - 1;
  }
  return state;
}
