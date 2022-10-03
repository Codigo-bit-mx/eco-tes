import React from 'react'
import NextLink from 'next/link'
import { Box, Grid, TextField, Typography, Link, Button } from '@mui/material'
import { AuthLayout } from '../../components/layout/AuthLayout'

const LoginPage = () => {
  return (

    <AuthLayout title={'Ingresar'} >
      
    <Box sx={{width: 350, padding:'10px 20px'}}> </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}> 
          <Typography variant='h1'>Iniciar Sesión</Typography>
        </Grid>

        {/* <Grid item xs={12}>
          <TextField label='Correo' variant='filled' />
        </Grid>
      
        <Grid item xs={12}>
          <TextField label='password' variant='filled' />
        </Grid>
      
        <Grid item xs={12}>
         <Button
          color='secondary'
          className='circular-btn'
          size='large'
          fullWidth
         >Ingresar</Button>
        </Grid>

        <Grid item xs={12} display='flex' justifyContent='end'>
          <NextLink href="/auth/register" passHref>
            <Link underline='always'>
              ¿No tienes cuenta?
            </Link>
          </NextLink>
        </Grid> */}
      
      </Grid>

      

    </AuthLayout>
  )
}

export default LoginPage