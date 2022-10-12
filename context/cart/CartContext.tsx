import {createContext} from 'react'
import { ICartProduct } from '../../interface';


interface ContextProps {
    cart: ICartProduct[];
    numberofitems:number
    subtotal: number
    tax: number
    total: number

    addProduct: (producto: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: ( product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)