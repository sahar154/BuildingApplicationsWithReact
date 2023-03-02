import * as types from "./actionTypes";

// the action creator from create course
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}
