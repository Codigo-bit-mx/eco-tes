import React, {FC, useReducer} from 'react'
import {UIContext, UIReducer} from '.'

interface Props {
    children: React.ReactNode;
}

export interface UIState {
    menuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    menuOpen: false, 
}

export const UIProvider: FC<Props> = ({ children })  => {

const [state, dispatch] = useReducer( UIReducer, UI_INITIAL_STATE);
 

    const openMenuSidebar = () => {
        dispatch({
            type: 'UI-OPEN SIDEBAR MENU' 
        })
    }
 


return (
  <UIContext.Provider value={{
    ...state,
    
    openMenuSidebar
  }}>

    {children}
  </UIContext.Provider>
)
}