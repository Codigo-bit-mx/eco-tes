import React, {FC, useContext, useEffect, useReducer} from 'react'
import {AuthContext, AuthReducer} from './'
import { IUser } from '../../interface';
import conexionTeslo from '../../api/tesloApi'
import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
    children: React.ReactNode;
}

export interface AuthState {
    isLoogedIn: boolean
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoogedIn: false,
    user: undefined
}

export const AuthProvider: FC<Props> = ({ children })  => {

const [state, dispatch] = useReducer( AuthReducer, AUTH_INITIAL_STATE);

useEffect(() => {
    checkToken()
},[])

const checkToken = async() => {

    const token = Cookies.get('token')
    if(!token) return
    
    try {
        const {data} = await conexionTeslo.get('/user/validator-jwt')    
        const {token, user} = data
        Cookies.set('token', token)
        dispatch({
         type: '[Auth] - Login',
         payload: user     
        })
    } catch (error) {
        Cookies.remove('token')
    }

}

const loginUser = async(email: string, password: string): Promise<boolean> => {    
    try{  
        
     const {data} = await conexionTeslo.post('/user/login', { email, password })
     const {token, user} = data
     Cookies.set('token', token)
        dispatch({
         type: '[Auth] - Login',
         payload: user     
        })
    return true            
    
    }catch(err){
      return false
    }
        
    }

const registerUser = async( name:string, email:string, password: string): Promise<{hasError: boolean; message?:string}> => {
    try{      
        const {data} = await conexionTeslo.post('/user/register', {name, email, password})
        const {token, user} = data
        Cookies.set('token', token)
           dispatch({
            type: '[Auth] - Login',
            payload: user     
           })
        return {
            hasError: false
        }
    }catch(error){
        if(axios.isAxiosError(error)){
            return {
                hasError:true,
                message: error.response?.data.message
            }
        }

        return {
            hasError: true,
            message: 'No se pudo crear el usuario - intentalo de nuevo'
        }
    }
}

   
    const logoutUser = () => {
        dispatch({
            type: '[Auth] - Logout'
        })
    }
   

return (
    <AuthContext.Provider value={{
        ...state,
        loginUser,
        logoutUser,
        registerUser
        
    }}>
        {children}
    </AuthContext.Provider>
)
}
