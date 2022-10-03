import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { ProductList } from '../../components/products/'
import { FullScreenLoading } from '../../components/ui/FullScreenLoading'
import { useProduct } from '../../hooks'

const Men = () => {

    const { products, isLoading } = useProduct('/product?gender=men')


    return (
    <ShopLayout title={'Teslo-shop - Men'} pageDescription={'Product - Men'} imageFullUrl={'ruta'}>

    <Typography variant='h1' >Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1}}> Todos los productos para hombre</Typography>
    
    
    
    { isLoading 
    
    ?  <FullScreenLoading />
    :     <Grid container spacing={4}>
          <ProductList 
            products={products}
          />
        </Grid>
    }


  </ShopLayout>
  )
}


export default Men; 