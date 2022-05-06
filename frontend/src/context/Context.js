import { createContext, useReducer } from "react";
import { useEffect } from "react";
import Reducer from "./Reducer";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  categories: null,
  darkmode: false,
};

export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        categories: state.categories,
        darkmode: state.darkmode,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
