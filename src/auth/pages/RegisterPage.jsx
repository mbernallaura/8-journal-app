import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';

const formData = {
  email: 'prueba@gmail.com',
  password: '123456',
  displayName: 'Prueba'
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El email debe tener un @'],
  password: [(value) => value.lenght >=6 , 'El password debe tener mas de 6 letras'],
  displayName: [(value) => value.includes >=1, 'El nombre es obligatorio']
}
export const RegisterPage = () => {

  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid
  } =useForm(formData, formValidations);
  
  const onSubmit = (event) =>{
    event.preventDefault();
    console.log(formState);
  }

  return (
    <AuthLayout title='Register'>
    <h1>FormValid {isFormValid ? 'Valido': 'Incorrecto'}</h1>
      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={ 12 } sx={{ marginTop: 2 }}>
            <TextField 
              label='Nombre Completo' 
              type='text'
              placeholder='Nombre completo'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={ onInputChange }
              error ={ !displayNameValid }
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ marginTop: 2 }}>
            <TextField 
              label='Correo' 
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email' 
              value={ email }
              onChange={ onInputChange }
              // error ={ !emailValid }
              // helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ marginTop: 2 }}>
            <TextField 
              label='Contraseña' 
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
              // error ={ !passwordValid }
              // helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
            <Grid item xs={ 12 }>
              <Button type='submit' variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}