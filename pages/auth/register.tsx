import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { AuthLayout } from '../../components/layout/AuthLayout'
import { isEmail } from '../../utils/validatorEmail';
import conexionTeslo from '../../api/tesloApi';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context/auth';

type formData = {
    name: string
    email: string
    password: string
  };

const RegisterPage = () => {

    const router = useRouter()

    const { registerUser } = useContext(AuthContext)
    const [showError, setShowError] = useState(false)
    const[ showMessage, setShowMessage ] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<formData>();

    const onRegisterForm = async ({name, email, password}: formData) => {
        setShowError(false)
        const {hasError, message} = await registerUser(name, email, password)

        if( hasError ){
            setShowError(true)
            setShowMessage(message!)
            setTimeout(() => {
                setShowError(false)
              }, 3000)
        }
        router.replace('/')
    }

  return (
    <AuthLayout title={'Ingresar'}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
           
           <form onSubmit={handleSubmit(onRegisterForm)} noValidate >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                    <Chip 
                        label={showMessage}
                        color='error'
                        icon={ <ErrorOutline />}
                        className='fadeIn'
                        sx={{ display: showError ? 'flex' : 'none' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        label="Nombre completo"
                        variant="filled"
                        fullWidth
                        {...register('name', {
                            required: 'Este campo es requerido'
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message} 
                        />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        label="Email"
                        variant="filled"
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
                        label="Contraseña"
                        type='password'
                        variant="filled"
                        fullWidth
                        {...register('password', {
                            required: 'Este campo es requerido',
                          })}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type='submit'
                        color="secondary"
                        className='circular-btn'
                        size='large'
                        fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href="/auth/login" passHref>
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>

            </form>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage