//common function to make Asynchronous calls
function AsyncPostCall(url, data) {
  return fetch(`http://localhost:3001${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    return response.json();
  });
}

function AsyncGetCall(url) {
  return fetch(`http://localhost:3001${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => {
    return response.json();
  });
}

export function CreateStart() {
  return {
    type: "CREATE_START"
  };
}

export function LoginStart() {
  return {
    type: "LOGIN_START"
  };
}

export function Register(url, data) {
  return dispatch => {
    AsyncPostCall(url, data).then(json => {
      if (!json.success) {
        dispatch(CreateFailed(json.error));
      } else {
        dispatch(Created());
      }
    });
  };
}

export function Created() {
  return {
    type: "CREATED"
  };
}

export function CreateFailed(error) {
  return {
    type: "CREATE_FAILED",
    data: error
  };
}

export function Login(url, data) {
  return dispatch => {
    AsyncPostCall(url, data).then(json => {
      if (!json.success) {
        dispatch(LoginFailed(json.error));
      } else {
        dispatch(LoginSuccess(json.data));
      }
    });
  };
}

export function LoginSuccess(data) {
  return {
    type: "LOGIN_SUCCESS",
    data
  };
}

export function LoginFailed(data) {
  return {
    type: "LOGIN_FAIL",
    data
  };
}

export function Logout() {
  return {
    type: "LOGOUT"
  };
}

export function UpdateProfile(url, data) {
  return dispatch => {
    AsyncPostCall(url, data).then(json => {
      if (json.success) {
        dispatch(UpdateSuccess(data.name));
      }
    });
  };
}

export function UpdateSuccess(data) {
  return {
    type: "UPDATE_SUCCESS",
    data
  };
}

export function UpdateAddress(url, data) {
  return dispatch => {
    AsyncPostCall(url, data).then(json => {
      if (json.success) {
        dispatch(AddressUpdateSuccess(json.result[0].addresses));
      }
    });
  };
}

export function AddressUpdateSuccess(data) {
  return {
    type: "ADDRESS_UPDATE_SUCCESS",
    data
  };
}

export function DeleteAddress(url, data) {
  return dispatch => {
    AsyncPostCall(url, data).then(json => {
      if (json.success) {
        dispatch(AddressDeleteSuccess(json.result[0].addresses));
      }
    });
  };
}

export function AddressDeleteSuccess(data) {
  return {
    type: "ADDRESS_DELETE_SUCCESS",
    data
  };
}

export function FetchProducts(url) {
  return dispatch => {
    AsyncGetCall(url).then(json => {
      dispatch(FetchProductsSuccess(json));
    });
  };
}

export function FetchProductsSuccess(data) {
  return {
    type: "FETCH_PRODUCTS_SUCCESS",
    data
  };
}

export function FetchProductDetails(url) {
  return dispatch => {
    AsyncGetCall(url).then(json => {
      dispatch(FetchProductDetailsSuccess(json));
    });
  };
}

export function FetchProductDetailsSuccess(data) {
  return {
    type: "FETCH_PRODUCTDETAILS_SUCCESS",
    data
  };
}

export function AddToCart(isAuthenticated, email, data, url) {
  return dispatch => {
    if (isAuthenticated) {
      var newdata = { email: email, item: data };
      AsyncPostCall(url, newdata).then(json => {
        dispatch(AddToCartSuccess(json[0]));
      });
    } else {
      dispatch(AddToLocalCart(data));
    }
  };
}

export function AddToLocalCart(data) {
  return {
    type: "ADD_TO_LOCAL_CART",
    data
  };
}

export function AddToCartSuccess(data) {
  return {
    type: "ADD_TO_CART_SUCCESS",
    data
  };
}

export function SaveCart(url, data) {
  return dispatch => {
    AsyncPostCall(url, data).then(json => {
      if (json.success) {
        dispatch(SaveCartSuccess());
      }
    });
  };
}

export function SaveCartSuccess() {
  return {
    type: "SAVE_CART_SUCCESS"
  };
}

export function RemoveItem(url, data) {
  return dispatch => {
    if (data.email) {
      AsyncPostCall(url, data).then(json => {
        dispatch(RemoveItemSuccess(json[0]));
      });
    } else {
      dispatch(RemoveLocalItem(data));
    }
  };
}

export function RemoveLocalItem(data) {
  return {
    type: "REMOVE_LOCAL_ITEM",
    data
  };
}

export function RemoveItemSuccess(data) {
  return {
    type: "REMOVE_ITEM_SUCCESS",
    data
  };
}

export function ClearProductMessages() {
  return {
    type: "CLEAR_PRODUCT_MESSAGES"
  };
}

export function ClearUpdateFlags() {
  return {
    type: "CLEAR_UPDATE_FLAGS"
  };
}
