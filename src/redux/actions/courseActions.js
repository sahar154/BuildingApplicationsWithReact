import * as types from "./actionTypes";
import * as courseApiThunk from "../../api/courseApi";
import { beginApiCall, ApiCallError } from "./apiStatusActions";

// the action creator from create course
// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course: course };
// }

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function createCourseSuccess(course) {
  //alert(1);
  return { type: types.CREATE_COURSE_SUCCESS, course: course };
}
export function updateCourseSuccess(course) {
  //alert(2);
  return { type: types.UPDATE_COURSE_SUCCESS, course: course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApiThunk
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(ApiCallError(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApiThunk
      .saveCourse(course)
      .then((savedCourse) => {
        console.log("66");
        //alert(66);
        //alert(savedCourse.title);
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(ApiCallError(error));
        //alert("error=" + error);
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApiThunk.deleteCourse(course.id);
  };
}
