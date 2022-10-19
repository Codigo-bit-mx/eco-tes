import { createContext } from 'react';
import { IUser } from '../../interface';

interface ContextProps {
 isLoogedIn: boolean;
 user?: IUser;
 

//metodos
loginUser: (email: string, password: string) => Promise<boolean>
logoutUser: () => void
registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string | undefined; }>

}

export const AuthContext = createContext({} as ContextProps)