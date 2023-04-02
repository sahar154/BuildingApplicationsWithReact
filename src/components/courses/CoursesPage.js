import React from "react";
// 1
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import * as authorAction from "../../redux/actions/authorActions";
// 6
import propTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    RedirectToAddCoursePage: false,
  };

  // handleChange = (event) => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course: course });
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   //this.props.dispatch(courseAction.createCourse(this.state.course));
  //   //this.props.createCourse(this.state.course);
  //   this.props.actions.createCourse(this.state.course);
  // };
  componentDidMount() {
    const { courses, actions } = this.props;

    if (courses.length === 0)
      this.props.actions.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    if (this.props.authors.length === 0)
      actions.loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
  }

  render() {
    return (
      // <form onSubmit={this.handleSubmit}>
      //   <h2>Courses</h2>
      <>
        {this.state.RedirectToAddCoursePage && <Redirect to="/course" />}
        <h3>Add course</h3>
        <button
          style={{ marginButton: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ RedirectToAddCoursePage: true })}
        >
          Add course
        </button>
        <CourseList courses={this.props.courses} />
        {/* <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        ></input>
        <input type="submit" value="Save"></input> */}
        {/* {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))} */}
      </>
      // </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: propTypes.array.isRequired,
  authors: propTypes.array.isRequired,
  //dispatch: propTypes.func.isRequired,
  //createCourse: propTypes.func.isRequired,
  actions: propTypes.object.isRequired,
};
// 3
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
}

function mapDispatchToProps(objToDispatch) {
  return {
    //createCourse: (course) => dispatch(courseAction.createCourse(course)),
    //createCourse: (course) => dispatch(courseAction.createCourse(course)),
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, objToDispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, objToDispatch),
    },
  };
}

// 2
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(CoursesPage);
