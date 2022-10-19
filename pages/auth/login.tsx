import React, { useState, useContext } from 'react'
import NextLink from 'next/link'
import { Box, Grid, TextField, Typography, Link, Button, Chip } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { AuthLayout } from '../../components/layout/AuthLayout'
import { isEmail } from '../../utils/validatorEmail';
import conexionTeslo from '../../api/tesloApi'
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context/auth';
import { useProduct } from '../../hooks';

type formData = {
  email: string,
  password: string,
};

const LoginPage = () => {

  const router = useRouter()
  const {loginUser} = useContext(AuthContext)
  const [showError, setShowError] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<formData>();

  const onLoginUser = async ({email, password}: formData) => {
      
  const isValidLogin = await loginUser(email, password)
    
    if(!isValidLogin){
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }

    router.replace('/')
  }

  return (

    <AuthLayout title={'Ingresar'} >
      
    <Box sx={{ width: 350, padding:'10px 20px' }}> 
     
     <form onSubmit={ handleSubmit(onLoginUser)} noValidate>
     <Grid container spacing={2}>  
        <Grid item xs={12} > 
          <Typography variant='h1'>Iniciar Sesión</Typography>
          <Chip 
            label='No se reconoce este usuario / contraseña'
            color='error'
            icon={ <ErrorOutline />}
            className='fadeIn'
            sx={{ display: showError ? 'flex' : 'none' }}
          />

        </Grid>

        <Grid item xs={12}>
          <TextField 
              label='Correo' 
              variant='filled'
              fullWidth
              {...register('email', {
                required: 'Este campo es requerido',
                validate: isEmail
              })}
              error={!!errors.email}
              helperText={errors.email?.message}

              />
        </Grid>
      
        <Grid item xs={12}>
          <TextField 
              label='password'
              variant='filled'
              fullWidth
              {...register('password', {
                required: 'Este campo es requerido',
                minLength: { value: 6, message: 'Minimo 6 caracteres'}
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
          />
        </Grid>
      
        <Grid item xs={12}>
         <Button
            type='submit'
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
        </Grid>
      
      </Grid>

      </form>
      </Box>
    </AuthLayout>
  )
}

export default LoginPage