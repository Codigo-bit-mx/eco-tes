import { AuthState } from '.';
import {IUser} from '../../interface'

type AuthActionType = 
| {type: '[Auth] - Login', payload: IUser }
| {type: '[Auth] - Logout'}


export const AuthReducer = ( state: AuthState, action: AuthActionType  ): AuthState => {

    switch(action.type){
        case '[Auth] - Login': 
            return {
               ...state,
               isLoogedIn: true,
               user: action.payload
            }
        
        case '[Auth] - Logout':
            return{
               ...state,
               isLoogedIn: false,
               user: undefined
            }

        default:
            return state;
    }
}