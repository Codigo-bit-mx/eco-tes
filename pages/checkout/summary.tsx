import React from 'react'
import NextLink from 'next/link'
import { ShopLayout } from '../../components/layout'
import { CartList } from '../../components/cart'
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material'
import { OrderSummary } from '../../components/cart'

const SummaryPage = () => {
  return ( 
    <ShopLayout title={'Resumen'} pageDescription={'Resumen de la orden'} >
    <Typography sx={{mb:1}} variant='h1' component='h1'>Resumen de la orden</Typography>

    <Grid container>
        <Grid item xs={12} sm={7}>
            <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
        <Card className='summary-card'>
            <CardContent>

                <Typography variant='h2'>Resumen de entrega</Typography>
                    <Divider sx={{my:1}} />

                <Box display='flex' justifyContent='space-between'>
                    <Typography>Direccion de entrega</Typography>
                    <NextLink href='/checkout/address' passHref>
                        <Link underline='always'>Editar</Link>
                    </NextLink>
                </Box>
                
                <Typography>Ossmar Gonzalez</Typography>
                <Typography>156 Algun lugar</Typography>
                <Typography>Estado de mexico</Typography>
                <Typography>MEXICO</Typography>
                <Typography>+52 5518478965</Typography>
                
                <Divider sx={{my:1}} />

                <Box display='flex' justifyContent='space-between'>
                <Typography>Compra</Typography>
                    <NextLink href='/cart' passHref>
                        <Link underline='always'>Editar</Link>
                    </NextLink>
                </Box>

                <OrderSummary />

                <Box sx={{mt:3}}>
                    <Button color="secondary" className='circular-btn' fullWidth>Checkout</Button>
                </Box>

            </CardContent>
        </Card> 
        </Grid>
    </Grid>

    </ShopLayout>

  )
}

export default SummaryPage