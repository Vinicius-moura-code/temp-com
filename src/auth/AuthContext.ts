import { createContext } from "react";
import { JWTContextType } from "./types";

export const AuthContext = createContext<JWTContextType | null>(null);
