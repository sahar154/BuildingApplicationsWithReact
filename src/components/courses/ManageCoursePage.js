import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import * as authorAction from "../../redux/actions/authorActions";
import propTypes from "prop-types";
import CourseForm from "./CourseForm";
//import { newCourse } from "../../../tools/mockData";
//import { bindActionCreators } from "redux";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  //const { courses,authors, loadAuthors,loadCourses } = this.props;

  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        //setError("loading courses failed" + error);
        //this.props.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0)
      //if (this.props.authors.length === 0)
      // 4
      // instead of this.props.loadAuthors
      loadAuthors().catch((error) => {
        //setError("loading authors failed" + error);
        alert("loading authors failed" + error);
      });
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    saveCourse(course)
      .then(() => {
        history.push("/courses");
      })
      .catch((err) => {
        alert("IN CATCH" + err);
        console.log("IN CATCH");
      });
  }

  return (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
      />
    </>
  );
}

ManageCoursePage.propTypes = {
  course: propTypes.object.isRequired,
  authors: propTypes.array.isRequired,
  courses: propTypes.array.isRequired,
  //actions: propTypes.object.isRequired,
  loadCourses: propTypes.func.isRequired,
  loadAuthors: propTypes.func.isRequired,
  saveCourse: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};
// 3
function mapStateToProps(state) {
  return {
    course: state.curCourse,
    courses: state.courses,
    authors: state.authors,
  };
}
/*
function mapDispatchToProps(objToDispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, objToDispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, objToDispatch),
    },
  };
}
*/
const mapDispatchToProps = {
  loadCourses: courseAction.loadCourses,
  saveCourse: courseAction.saveCourse,
  loadAuthors: authorAction.loadAuthors,
};

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(ManageCoursePage);

//export default ManageCoursePage;
