import React from 'react'
import { Typography, Box } from '@mui/material'
import { ShopLayout } from '../components/layout'

const Custom404 = () => {
  return (
    <ShopLayout title='Pagina 404' pageDescription='Pagina no encontrada'> 
        <Box display='flex'
             justifyContent='center'
             alignItems='center'
             height='calc(100vh - 200px)'
             sx={{ flexDirection: {xs: 'column', sm: 'row'}}}

             >
          
            <Typography variant='h3' fontSize={80} fontWeight={200}>404 | </Typography>
            <Typography marginLeft={2}> Pagina no encontrada</Typography>
        </Box>

    </ShopLayout>
  )
}

export default Custom404