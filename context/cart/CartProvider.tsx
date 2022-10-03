import React, {FC, useEffect, useReducer} from 'react'
import Cookie from 'js-cookie'
import {CartContext, CartReducer} from '.'
import { ICartProduct } from '../../interface';

interface Props {
    children: React.ReactNode;
}

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
   cart: []
}

export const CartProvider: FC<Props> = ({ children })  => {

const [state, dispatch] = useReducer( CartReducer, CART_INITIAL_STATE );

useEffect(() => {
  try{
    const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')! ) : []
    
    dispatch({
      type: '[Cart] - Add Product and Update',
      payload: cart  
    })
  }catch(error){
    dispatch({
      type: '[Cart] - Add Product and Update',
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
  const numberOfItem = state.cart.reduce((prev, current) => current.quantity + prev, 0)
  const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0)
  const taxRate = Number(process.env.NEXT_PUBLIC_TAXRATE)

  const orderSummary = {
    numberOfItem,
    subTotal,
    tax: subTotal * taxRate
  }

  console.log({orderSummary})

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