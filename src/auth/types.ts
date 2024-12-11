// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface IUserApp {
  displayName: string
  email: string
  photoURL: string
  phone: string
  cnpj: string
  RazaoSocial: string
  address: Address
  passwordLastChanged: string
  twoFactorEnabledAt: string
  twoFactorEnable: boolean
  physicalAssets: PhysicalAsset[]
  role?: string;
}

export interface Address {
  id: string
  street: string
  number: string
  complement: any
  neighborhood: string
  city: string
  state: string
  zipcode: string
  lastSync: string
}

export interface PhysicalAsset {
  id: string
  name: string
  type: string
  contracts: any[]
}

export type AuthUserType = null  | IUserApp;
//export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  mfaPending: boolean
  mfaEmail?: string | null;
  physicalAssetsSelected?: string | null
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  method: string;
  isAuthenticated: boolean;
  isInitialized: boolean;
  mfaPending: boolean;
  mfaEmail?: string | null;
  user: AuthUserType;
  verifyMfa: (code: string) => Promise<void>;
  login: (cnpj: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
  refreshMyAccount: () => void;
  physicalAssetsSelected?: string | null;
  SetPhysicalAssets: (value: string) => void;
};