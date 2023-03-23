import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import * as authorAction from "../../redux/actions/authorActions";
import propTypes from "prop-types";
//import { bindActionCreators } from "redux";

class ManageCoursePage extends React.Component {
  componentDidMount() {
    // shortcut instead od writing this.props.loadAuthors
    // 4
    const { courses, loadAuthors } = this.props;

    if (courses.length === 0)
      this.props.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    if (this.props.authors.length === 0)
      // 4
      // instead of this.props.loadAuthors
      loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
  }

  render() {
    return (
      <>
        <h3>Manage course</h3>
      </>
    );
  }
}

ManageCoursePage.propTypes = {
  courses: propTypes.array.isRequired,
  authors: propTypes.array.isRequired,
  //actions: propTypes.object.isRequired,
  loadCourses: propTypes.func.isRequired,
  loadAuthors: propTypes.func.isRequired,
};
// 3
function mapStateToProps(state) {
  return {
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
  loadAuthors: authorAction.loadAuthors,
};

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(ManageCoursePage);

//export default ManageCoursePage;
