import React from 'react'
import { Typography, Grid } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { FullScreenLoading } from '../../components/ui/FullScreenLoading'
import { useProduct } from '../../hooks'
import { ProductList } from '../../components/products'


const Woman = () => {
  
    const { products, isLoading } = useProduct('/product?gender=women')

    return (
     <ShopLayout title={'Teslo-shop - Woman'} pageDescription={'Product - Woman'} imageFullUrl={'ruta'}>

    <Typography variant='h1' >Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1}}> Todos los productos para mujer</Typography>
    
    
    
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


export default Woman