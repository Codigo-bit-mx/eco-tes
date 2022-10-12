import React, {FC, useEffect, useReducer} from 'react'
import Cookie from 'js-cookie'
import {CartContext, CartReducer} from '.'
import { ICartProduct } from '../../interface';

interface Props {
    children: React.ReactNode;
}

export interface CartState {
    cart: ICartProduct[]
    numberofitems:number
    subtotal: number
    tax: number
    total: number

}

const CART_INITIAL_STATE: CartState = {
   cart: [],
   numberofitems: 0,
   subtotal: 0,
   tax: 0,
   total: 0,
}

export const CartProvider: FC<Props> = ({ children })  => {

const [state, dispatch] = useReducer( CartReducer, CART_INITIAL_STATE );

useEffect(() => {
  try{
    const cookieProduct = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')! ) : []
  
    dispatch({
      type: '[Cart] - LoadCart from cookies | storage',
      payload: cookieProduct
    })

  }catch(error){
    dispatch({
      type: '[Cart] - LoadCart from cookies | storage',
      payload: [] 
    })
  }
  }, [])
 

useEffect(() => {
  if(state.cart.length > 0) {
    Cookie.set('cart', JSON.stringify(state.cart))
  }
}, [state.cart]);


useEffect(() => {
  const numberofitems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
  const subtotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0)
  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE)
  const tax = subtotal * taxRate
  const total = subtotal * (taxRate + 1)

  const orderSummary = {
    numberofitems,
    subtotal,
    tax,
    total
  }

  dispatch({
    type:'[Cart] - Update order summary',
    payload: orderSummary
  })

}, [state.cart])


 
const addProduct = (producto: ICartProduct) => {

  const productInCart = state.cart.some(p => p._id === producto._id)
  if(!productInCart) { return  dispatch({type:'[Cart] - Add Product and Update', payload: [...state.cart, producto]})}

  const productoInCartButDifferentSize = state.cart.some( p => p._id === producto._id && p.size === producto.size)
  if(!productoInCartButDifferentSize){
    return dispatch({
     type:'[Cart] - Add Product and Update', payload: [...state.cart, producto]
    })
  }

const updateQuantity = state.cart.map( p => {
    if( p._id !== producto._id ) return p;
    if( p.size !== producto.size ) return p;

    p.quantity += producto.quantity
    return p;
  })

  dispatch({type:'[Cart] - Add Product and Update', payload: updateQuantity})
  Cookie.set('cart', JSON.stringify(state.cart))
  } 


const updateCartQuantity = ( product: ICartProduct ) => {
    dispatch({
      type: '[Cart] - Change Cart Quantity',
      payload: product
    })
  }

const removeCartProduct = (product: ICartProduct) => {
  dispatch({
    type: '[Cart] - Remove Cart',
    payload: product
  })
}


return (
  <CartContext.Provider value={{
    ...state,
    addProduct,
    updateCartQuantity,
    removeCartProduct
  }}>

    {children}
  </CartContext.Provider>
)
}