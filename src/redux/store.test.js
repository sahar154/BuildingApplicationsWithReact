import { createStore } from "redux";
import rootReducer from "./reducers/mainReducer";
import initialState from "./reducers/StoreInitialStae";
import * as courseActions from "./actions/courseActions";

it("Should handle creating courses", function () {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code",
  };

  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
