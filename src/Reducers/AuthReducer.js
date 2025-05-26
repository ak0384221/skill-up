const authContent = {
  currentUser: null,
  authLoading: false,
  authError: null,
};
function authReducerMethod(currValue, action) {
  let newValue = currValue;

  if (action.type === "SIGN_UP") {
  }

  if (action.type === "LOG_IN") {
    newValue = {
      currentUser: action.payload.user,
      authLoading: false,
      authError: null,
    };
  }

  if (action.type === "GOOGLE_AUTH") {
  }

  if (action.type === "LOG_OUT") {
    newValue = {
      currentUser: null,
      authLoading: false,
      authError: null,
    };
  }
  if (action.type === "SET_LOADING") {
    newValue = {
      ...currValue,
      authLoading: action.payload.loadingState,
    };
  }
  if (action.type === "NOT_AUTHED") {
    newValue = {
      currentUser: action.payload.user,
      authLoading: false,
      authError: null,
    };
  }
  if (action.type === "SET_ERROR") {
    newValue = {
      ...currValue,
      authError: action.payload.errorState,
      authLoading: false,
    };
  }

  return newValue;
}
export { authContent, authReducerMethod };
