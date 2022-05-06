export const LoginStart = (userCredential) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});
export const Logout = () => ({
  type: "LOGOUT",
});
export const Start = (userCredential) => ({
  type: "UPDATE_START",
});

export const Success = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const Failure = () => ({
  type: "UPDATE_FAILURE",
});
