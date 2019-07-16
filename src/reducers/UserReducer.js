const UserReducer = (
  state = {
    isAuthenticated: false,
    signupCompleted: false,
    signupFailMessage: "",
    loginFailMessage: "",
    updateCompleted: false,
    loggedInUser: {
      name: "",
      email: "",
      addresses: []
    }
  },
  action
) => {
  var data;
  switch (action.type) {
    case "CREATE_START":
      return Object.assign({}, state, {
        signupFailMessage: ""
      });
    case "CREATE_FAILED":
      return Object.assign({}, state, { signupFailMessage: action.data });
    case "CREATED":
      return Object.assign({}, state, {
        signupCompleted: true,
        signupFailMessage: ""
      });
    case "LOGIN_START":
      return Object.assign({}, state, {
        loginFailMessage: ""
      });
    case "LOGIN_FAIL":
      return Object.assign({}, state, {
        loginFailMessage: action.data
      });
    case "LOGIN_SUCCESS":
      return Object.assign({}, state, {
        isAuthenticated: true,
        loggedInUser: {
          name: action.data.name,
          email: action.data.email,
          addresses: action.data.addresses
        }
      });
    case "UPDATE_SUCCESS":
      var data = Object.assign({}, state, {});
      data.updateCompleted = true;
      data.loggedInUser.name = action.data;
      return data;
    case "LOGOUT":
      return Object.assign({}, state, {
        isAuthenticated: false,
        loggedInUser: { name: "", email: "", addresses: [] },
        loginFailMessage: ""
      });
    case "ADDRESS_UPDATE_SUCCESS":
      data = Object.assign({}, state, {});
      data.loggedInUser.addresses = action.data;
      return data;
    case "ADDRESS_DELETE_SUCCESS":
      data = Object.assign({}, state, {});
      data.loggedInUser.addresses = action.data;
      return data;
    case "CLEAR_UPDATE_FLAGS":
      return Object.assign({}, state, { updateCompleted: false });
    default:
      return state;
  }
};

export default UserReducer;
