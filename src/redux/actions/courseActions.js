import * as types from "./actionTypes";
import * as courseApiThunk from "../../api/courseApi";

// the action creator from create course
// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course: course };
// }

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function createCoursesSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, courses: course };
}
export function updateCoursesSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, courses: course };
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

export function saveCourse() {
  return function (dispatch) {
    return courseApiThunk
      .saveCourse()
      .then((savedCourse) => {
        savedCourse.id
          ? dispatch(updateCoursesSuccess(savedCourse))
          : dispatch(createCoursesSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
