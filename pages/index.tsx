import type { NextPage } from 'next'
import { Typography, Grid } from '@mui/material'
import { ShopLayout } from '../components/layout'
import { ProductList } from '../components/products'
import { initialData } from '../database/products'
import { useProduct } from '../hooks/useProduct'
import { FullScreenLoading } from '../components/ui/FullScreenLoading'

const Home: NextPage = () => {

  const { products, isLoading } = useProduct('/product')


  return (
    <ShopLayout title={'Teslo-shop - home'} pageDescription={'Encuentra los mejores productos de teslo aqui'} imageFullUrl={'ruta'}>

      <Typography variant='h1' >Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1}}> Todos los productos </Typography>
      
      
      
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

export default Home
