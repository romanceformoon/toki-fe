import { createContext } from "react";
import { IUser } from "~/types/user";

export const CurrentUserContext = createContext<IUser | null>(null);
