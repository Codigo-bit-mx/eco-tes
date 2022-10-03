import {createContext} from 'react'
import { ICartProduct } from '../../interface';


interface ContextProps {
    cart: ICartProduct[];

    addProduct: (producto: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: ( product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)