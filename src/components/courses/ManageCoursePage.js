import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import * as authorAction from "../../redux/actions/authorActions";
import propTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
//import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

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

  const [curCourseWithAuthors, setCourse] = useState({ ...props.course });
  //const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [isSaving, setSavingState] = useState(false);

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
  }, [props.course]); // the useEffect will run each time props.course is changed

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = props.course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    //if (!formIsValid()) return;
    setSavingState(true);
    saveCourse(curCourseWithAuthors)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch((err) => {
        setSavingState(false);
        setErrors({ onSave: err.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <CourseForm
        course={curCourseWithAuthors}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        isSaving={isSaving}
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

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

// 3
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const curCourse =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course: curCourse,
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
