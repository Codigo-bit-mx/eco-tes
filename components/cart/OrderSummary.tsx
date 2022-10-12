import React, { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { CartContext } from '../../context/cart'
import { currency } from '../../utils'

export const OrderSummary = () => {

  const { numberofitems, subtotal, tax, total } = useContext(CartContext)
  
  return (
    <Grid container>
        <Grid item xs={6}> 
            <Typography>No. productos</Typography>             
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'> 
            <Typography>{ numberofitems } { numberofitems > 1 ? 'Productos' : 'Producto'} </Typography>    
        </Grid>

        <Grid item xs={6}> 
            <Typography>Subtotal</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'> 
            <Typography>{currency.format(subtotal) }</Typography>
        </Grid>

        <Grid item xs={6}> 
            <Typography>Impuestos (15)</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'> 
            <Typography>{ currency.format(tax) }</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}}> 
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'> 
            <Typography>{currency.format(total)}</Typography>
        </Grid>



    </Grid>
  )
}
