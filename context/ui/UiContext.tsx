import {createContext} from 'react'


interface ContextProps {
    menuOpen: boolean;

    //METODOS
    openMenuSidebar: () => void;
}

export const UIContext = createContext({} as ContextProps)