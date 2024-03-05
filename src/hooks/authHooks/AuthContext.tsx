import React, { createContext, useReducer, useContext, ReactNode } from "react";

type AuthState = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
};

type AuthAction =
  | { type: "LOGIN"; isAdmin: boolean }
  | { type: "LOGOUT" }
  | { type: "LOGIN_FAILURE" };

type AuthContextType = {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const initialState: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        isAdmin: action.isAdmin,
        loading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch } as AuthContextType}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
