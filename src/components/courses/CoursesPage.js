import React from "react";
// 1
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
// 6
import propTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //this.props.dispatch(courseAction.createCourse(this.state.course));
    //this.props.createCourse(this.state.course);
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        ></input>
        <input type="submit" value="Save"></input>
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: propTypes.array.isRequired,
  //dispatch: propTypes.func.isRequired,
  //createCourse: propTypes.func.isRequired,
  actions: propTypes.object.isRequired,
};
// 3
function mapStateToProps(state) {
  let x = state.courses;
  return {
    //courses: state.courses,
    courses: x,
  };
}
function mapDispatchToProps(objToDispatch) {
  return {
    //createCourse: (course) => dispatch(courseAction.createCourse(course)),
    //createCourse: (course) => dispatch(courseAction.createCourse(course)),
    actions: bindActionCreators(courseAction, objToDispatch),
  };
}

// 2
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(CoursesPage);
