import { useEffect, useReducer, useCallback, useMemo } from "react";
// utils
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localStorageAvailable";
//
import { handleTokenRefresh, isValidToken, setSession } from "./utils";
import { ActionMapType, AuthStateType, AuthUserType } from "./types";
import { AuthContext } from "./AuthContext";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
  MFA_REQUIRED = "MFA_REQUIRED",
  PHYSICAL_ASSETS = "PHYSICAL_ASSETS",
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.MFA_REQUIRED]: {
    mfaPending: boolean;
    mfaEmail?: string;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;

  [Types.PHYSICAL_ASSETS]: {
    physicalAssetsSelected: string;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  mfaPending: false,
  mfaEmail: null,
  physicalAssetsSelected: null,
};

const reducer = (state: AuthStateType, action: ActionsType): AuthStateType => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };

    case Types.LOGIN:
    case Types.REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case Types.MFA_REQUIRED:
      return {
        ...state,
        mfaPending: action.payload.mfaPending,
        mfaEmail: action.payload.mfaEmail,
      };
    case Types.PHYSICAL_ASSETS:
      return {
        ...state,
        physicalAssetsSelected: action.payload.physicalAssetsSelected,
      };

    default:
      return state;
  }
};

type AuthProviderProps = {
  children: React.ReactNode;
};

function JustValidateToken(accessToken: string | null) {
  if (accessToken === null) return false;
  return accessToken && isValidToken(accessToken);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      const keepConnected = storageAvailable
        ? localStorage.getItem("KeepConnected") === "true"
        : false;

      if (keepConnected && !JustValidateToken(accessToken)) {
        await handleTokenRefresh();
      }

      if (JustValidateToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get("/v1/account/my-account");

        const { user } = response.data.response;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });

        dispatch({
          type: Types.PHYSICAL_ASSETS,
          payload: {
            physicalAssetsSelected: user?.physicalAssets[0]?.id,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setSession(null);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (cnpj: string, password: string) => {
      cnpj = cnpj.replace(/\D/g, "").trim();
      const response = await axios.post("/v1/Auth/login", {
        cnpj,
        password,
      });
      const { mfaRequired } = response.data.response;
      if (mfaRequired) {
        dispatch({
          type: Types.MFA_REQUIRED,
          payload: {
            mfaPending: true,
            mfaEmail: response.data?.response?.email,
          },
        });
      } else {
        const { token, user } = response.data.response;

        setSession(token);
        dispatch({
          type: Types.LOGIN,
          payload: {
            user,
          },
        });
        dispatch({
          type: Types.PHYSICAL_ASSETS,
          payload: {
            physicalAssetsSelected: user?.physicalAssets[0]?.id,
          },
        });
      }
    },
    [dispatch]
  );

  //MFA
  const verifyMfa = useCallback(
    async (code: string) => {
      const response = await axios.post("/v1/Auth/mfa/verify", {
        email: state.mfaEmail,
        code,
      });

      const { token, user } = response.data.response;

      setSession(token);
      dispatch({
        type: Types.MFA_REQUIRED,
        payload: { mfaPending: false, mfaEmail: "" },
      });

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });

      dispatch({
        type: Types.PHYSICAL_ASSETS,
        payload: {
          physicalAssetsSelected: user?.physicalAssets[0]?.id,
        },
      });
    },
    [state.mfaEmail]
  );

  // REGISTER
  const register = useCallback(
    async (
      cnpj: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      const response = await axios.post("/v1/account/register", {
        cnpj,
        password,
        firstName,
        lastName,
      });
      const { token, user } = response.data;

      localStorage.setItem("accessToken", token);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    await axios
      .post("/v1/Auth/logout", {
        email: state.user?.email,
      })
      .then(() => {
        setSession(null);
        dispatch({
          type: Types.LOGOUT,
        });
      });
  }, [state.user?.email]);

  // Refresh My Account
  const refreshMyAccount = useCallback(async () => {
    const response = await axios.get("/v1/account/my-account");

    const { user } = response.data.response;

    dispatch({
      type: Types.INITIAL,
      payload: {
        isAuthenticated: true,
        user,
      },
    });
  }, []);

  const SetPhysicalAssets = useCallback((value: string) => {
    dispatch({
      type: Types.PHYSICAL_ASSETS,
      payload: {
        physicalAssetsSelected: value,
      },
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      mfaPending: state.mfaPending,
      mfaEmail: state.mfaEmail,
      verifyMfa,
      method: "jwt",
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout,
      refreshMyAccount,
      physicalAssetsSelected: state.physicalAssetsSelected,
      SetPhysicalAssets,
    }),
    [
      state.isInitialized,
      state.isAuthenticated,
      state.user,
      state.mfaPending,
      state.mfaEmail,
      verifyMfa,
      login,
      register,
      logout,
      refreshMyAccount,
      state.physicalAssetsSelected,
      SetPhysicalAssets,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
