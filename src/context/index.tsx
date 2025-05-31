import { createContext } from 'react';

export const CurrentUserContext = createContext<IUser | null>(null);
