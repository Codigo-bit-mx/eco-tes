import React from 'react'
import NextLink from 'next/link'
import { Box, Typography, Link } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'

const EmptyCard = () => {
  return (
  <ShopLayout title={'Carrito vacio'} pageDescription={'No hay articulos en el carrito de compras'}> 
    <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        sx={{flexDirection: {xs: 'column', sm:'row'}}}
    >

        <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography sx={{}}>Su carrito esta vacio</Typography>
        <NextLink href='/' passHref>
            <Link
            typography="h4" color='secondary'
            >Regresar</Link>
        </NextLink>
      
        </Box>
    </Box>
    </ShopLayout> 
  )
}


export default EmptyCard