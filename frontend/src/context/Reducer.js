const Reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isFetching: false,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: true,
      };
    case "LOGIN_OUT":
      return {
        ...state,
        user: null,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    case "UPDATE_FAILURE":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "SET_DARMODE":
      return {
        ...state,
        darkmode: !state.darkmode,
      };

    default:
      return state;
  }
};
export default Reducer;
