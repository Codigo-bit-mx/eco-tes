import { ICartProduct } from "../../interface"
import { CartState } from "./CartProvider"

type CartActionType = 
| {type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
| {type: '[Cart] - Add Product and Update', payload: ICartProduct[]}
| {type: '[Cart] - Change Cart Quantity', payload: ICartProduct}
| {type: '[Cart] - Remove Cart', payload: ICartProduct}
| {type: '[Cart] - Update order summary', 
    payload: {
        numberofitems: number
        subtotal:number
        tax: number
        total: number
    }
}


export const CartReducer = (state: CartState, action: CartActionType):CartState => {
    
    switch(action.type) {
        
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: action.payload
            }

        case '[Cart] - Add Product and Update': 
            return {
              ...state, 
              cart: action.payload
        }

        case '[Cart] - Change Cart Quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if( product._id !== action.payload._id) return product
                    if( product.size !== action.payload.size)return product

                    return action.payload

                })
            }

        case '[Cart] - Remove Cart': 
            return{
                ...state,
                cart: state.cart.filter( producto => !(producto._id === action.payload._id && producto.size === action.payload.size))
            }
        
        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

        default: 
            return state;
    }
}