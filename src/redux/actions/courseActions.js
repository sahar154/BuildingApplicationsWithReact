import * as types from "./actionTypes";
import * as courseApiThunk from "../../api/courseApi";

// the action creator from create course
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApiThunk
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
