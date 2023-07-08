export default (state, action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
      }
    default:
      return state;
  }
}