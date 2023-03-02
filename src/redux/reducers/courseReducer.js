import * as types from "../actions/actionTypes";
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE: {
      let res = [...state, { ...action.course }];
      return res;
    }
    // if an unknown action will be pass the current state will return
    default:
      return state;
  }
}
