import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layout'

const AddressPage = () => {
  return (

    <ShopLayout title='Direccion' pageDescription='Confirmar direccion de destino'>
        <Typography sx={{ mb:1 }}variant='h5' component='h5'>Dirección</Typography>

        <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Apellido' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Dirección' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Direccion 2 (opcional)' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Codigo postal' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Telefono' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        variant='filled'
                        label='Pais'
                        value={3}
                    >
                        <MenuItem>Mexico</MenuItem>
                        <MenuItem>Estados unidos</MenuItem>
                        <MenuItem>Guatemala</MenuItem>
                        <MenuItem>Canada</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
        </Grid>


        <Box sx={{mt:5}} display='flex' justifyContent='center'>
            <Button color='secondary' className='circular-btn' size="large">
                Revisar pedido
            </Button>
        </Box>

    </ShopLayout>

  )
}

export default AddressPage