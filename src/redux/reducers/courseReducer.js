export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_COURSE": {
      let c = { ...action.course, title: "sahar" };

      //let res = [...state, { ...action.course }];
      let res = [...state, { ...c }];
      return res;
    }
    // if an unknown action will be pass the current state will return
    default:
      return state;
  }
}
