import * as types from "./actionTypes";
import * as courseApiThunk from "../../api/courseApi";

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

export function saveCourse(course) {
  return function (dispatch) {
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
        alert("error=" + error);
        throw error;
      });
  };
}
