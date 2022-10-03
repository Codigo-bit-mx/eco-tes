import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui/FullScreenLoading'
import { useProduct } from '../../hooks'

const Kid = () => {
  
    const { products, isLoading } = useProduct('/product?gender=kid')
  
    return (
    <ShopLayout title={'Teslo-shop - Kid'} pageDescription={'Product - Kid'} imageFullUrl={'ruta'}>

    <Typography variant='h1' >Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1}}> Todos los productos para niño</Typography>
    
    
    
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


export default Kid