import * as types from "../actions/actionTypes";
import storeInitialStae from "./StoreInitialStae";

export default function courseReducer(
  state = storeInitialStae.courses,
  action
) {
  console.log("in switch");
  console.log("action.type=" + action.type);
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS: {
      console.log("CREATE_COURSE_SUCCESS");
      let res = [...state, { ...action.course }];
      return res;
    }
    case types.UPDATE_COURSE_SUCCESS: {
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    }
    case types.LOAD_COURSES_SUCCESS: {
      return action.courses;
    }
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    // if an unknown action will be pass the current state will return
    default:
      return state;
  }
}
