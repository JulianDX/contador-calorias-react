import { createContext, useReducer } from "react";
import { formDataReducer, initialState } from "../reducers/formDataReducer";
import { formDataState } from "../types";
import { formDataActions } from "../reducers/formDataReducer";

type ActivityProviderProps = {
  children: React.ReactNode;
};

type ActivityContextProps = {
  state: formDataState;
  dispatch: React.Dispatch<formDataActions>;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(formDataReducer, initialState);
  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
