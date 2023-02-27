import React from "react";
// 1
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
// 6
import propTypes from "prop-types";
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

  // handleSubmit = () => {
  //   // 5
  //   this.props.dispatch(courseAction.createCourse(this.state.course));
  //   alert(this.state.course.title);
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(courseAction.createCourse(this.state.course));
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
        {/* {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}  */}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: propTypes.array.isRequired,
  dispatch: propTypes.func.isRequired,
};
// 3
function mapStateToProps(state) {
  let x = state.courses;
  return {
    //courses: state.courses,
    courses: x,
  };
}
// 2
const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(CoursesPage);
