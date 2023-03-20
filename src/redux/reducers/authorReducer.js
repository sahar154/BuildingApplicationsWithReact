import * as types from "../actions/actionTypes";
import storeInitialStae from "./StoreInitialStae";

export default function authorReducer(
  //state = [],
  state = storeInitialStae.authors,
  action
) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS: {
      return action.authors;
    }
    // if an unknown action will be pass the current state will return
    default:
      return state;
  }
}
