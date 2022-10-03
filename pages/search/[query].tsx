import type { GetServerSideProps, NextPage } from 'next'
import { Typography, Grid } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { ProductList } from '../../components/products'
import { getAllProductsSlug, getAllSearchProduct, getAllProducts } from '../../database'
import { IProduct } from '../../interface'

interface Props {
    products: IProduct[],
    foundProduct: boolean,
    query: string
}


const Home: NextPage<Props> = ({products, foundProduct, query}) => {

    

  return (
    <ShopLayout title={'Teslo-shop - search'} pageDescription={'Busqueda en teslo-shop'} imageFullUrl={'ruta'}>
    <Typography variant='h1' >Busqueda</Typography>
    {
      foundProduct 
      ? <Typography variant='h2' sx={{ mb: 1}} >Todos los productos para {query}</Typography>     
      : <Typography variant='h2'sx={{mb: 1}}>No se encontraron resultados para {query}</Typography>
    
    }


      


     <Grid container spacing={4}>
            <ProductList 
              products={products}
            />
          </Grid>
     
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const { query } = params as {query: string}

    if(!query) {
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }


    let products = await getAllSearchProduct(query)
    const foundProduct = products.length > 0;

    if(!foundProduct){
      products = await getAllProducts()
    }

    return {
        props: {
            products,
            foundProduct,
            query
        }
    }
    
}



export default Home





