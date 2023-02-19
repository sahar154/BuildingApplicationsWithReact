export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_COUSRE":
      return [...state, { ...action.course }];
    // if an unknown action will be pass the current state will return
    default:
      return state;
  }
}
