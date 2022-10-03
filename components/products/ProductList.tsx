import React, {FC} from 'react'
import {IProduct} from '../../interface/interfaceProductos'
import {ProductCard} from './ProductCard'

interface Props {
    products: IProduct[]
}

export const ProductList: FC<Props> = ({products}) => {
  return (
    <>
    {products.map( product => (
       <ProductCard 
        key={product.slug}
        product={product}
       />
    ))}
    </>
  )
}
