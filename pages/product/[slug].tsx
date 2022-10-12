import React, {FC, useContext, useState} from 'react'
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { ProductSlideShow } from '../../components/products'
import { initialData } from '../../database/products'
import { ItemCounter } from '../../components/ui/ItemCounter'
import { SizeSelector } from '../../components/products'
import { getAllProductsSlug, getProduct } from '../../database'
import { ICartProduct, IProduct, ISize } from '../../interface'
import { CartContext } from '../../context/cart'

interface Props {
    product: IProduct
}

const ProductPage: NextPage<Props> = ({product}) => {
    
    const router = useRouter()

    const {addProduct} = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined, 
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1
    })

    const selectedSize = (size: ISize) => {
        setTempCartProduct( currentProduct => ({
            ...currentProduct,
            size
        }))
    }

    const selectedQuantity = ( quantity: number) => {
        setTempCartProduct( currentProduct => ({
          ...currentProduct,
          quantity  
        }))
    }


    const onaddProduct = () => {
        addProduct(tempCartProduct)
        // router.push('/cart')
    }

    return (
    <ShopLayout title={product.title} pageDescription={product.description} >
        
        <Grid container spacing={3}>

            <Grid item xs={12} sm={7}>
                <ProductSlideShow 
                    images={product.images}
                />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Box display='flex' flexDirection='column'>
                
                 <Typography variant='h1'>{product.title}</Typography>
                 <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>
                <Typography>{product.inStock}</Typography>

               <Box sx={{my: 2}}>
                 <Typography variant='subtitle2'>Cantidad</Typography>
              

                <ItemCounter 
                    currentValue={ tempCartProduct.quantity }
                    maxValue={ product.inStock }
                    updateQuantity={ selectedQuantity }
                />

                <SizeSelector
                    sizes={product.sizes}
                    selectedSize={ tempCartProduct.size }
                    onSelectedSize={ selectedSize }
                />
               
               </Box>
               
                    {product.inStock > 0 ? (
                    <Button 
                        color={tempCartProduct.size ? 'primary' : 'error'} 
                        className='circular-btn'
                        disabled={ tempCartProduct.size ? false : true }
                        onClick={ onaddProduct }
                        >
            
                        {tempCartProduct.size ? 'Agregar al carrito' : 'Selecciona una talla'}
                                           
                    </Button>
                    )
                    : 
                    (
                    <Chip 
                        color='error'
                        label='No hay disponibles'
                        variant= 'outlined'
                    />
                    ) 
                    
                    }


               {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

                <Box sx={{ mt:3 }}>
                    <Typography variant='subtitle2'>Descripción</Typography>
                    <Typography variant='body2'>{product.description}</Typography>
                </Box>
                
                
                </Box>
            </Grid>
            
        </Grid>

    </ShopLayout>    
  )
}


//getServerSide Props 
//este no lo usamos
// export const getServerSideProps: GetServerSideProps = async ({params}) => {

//     const { slug } = params as {slug: string}

//     const product = await getProduct(slug)
//     console.log(product)
//     if(!product) {
//         return {
//             redirect:{
//                 destination:'/',
//                 permanent:false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
    
// }


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const products =  await getAllProductsSlug()
    
    return {
        paths: products.map(({slug}) => ({
            params: {slug}
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const {slug = ''} = params as {slug: string}

    const product = await getProduct(slug)

    if(!product) {
                return {
                    redirect:{
                        destination:'/',
                        permanent:false
                    }
                }
            }


    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}


export default ProductPage