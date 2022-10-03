import {UIState} from './'

type UIActionType = 
| {type: 'UI-OPEN SIDEBAR MENU'}


export const UIReducer = (state: UIState, action: UIActionType): UIState => {

    switch(action.type){

        case 'UI-OPEN SIDEBAR MENU':
            return {
                ...state,
                menuOpen: !state.menuOpen
            }

        default:
            return state
    }
}