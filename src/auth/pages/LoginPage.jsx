import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

import { Google} from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '', 
  password: ''
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  // const [formSubmited, setFormSubmited] = useState(false);
  const { status, errorMessage } = useSelector(state => state.auth);
  const { email, password, onInputChange, emailValid, passwordValid, isFormValid } =useForm( formData );
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    // setFormSubmited(true);
    // if(!isFormValid)return;
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const onGoogleSignIn = () =>{
    // event.preventDefault();
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn'>
        <Grid container>
          <Grid item xs={ 12 } sx={{ marginTop: 2 }}>
            <TextField 
              label='Correo' 
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              // error ={ !!emailValid && formSubmited}
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
              // error ={ !!passwordValid && formSubmited}
              // helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 1 } sx={{ mt:2 }}>
            <Grid display={ !!errorMessage ? '' : 'none' } item xs={ 12 }>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button disabled={ isAuthenticating } type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button disabled={ isAuthenticating } onClick={ onGoogleSignIn } variant='contained' fullWidth>
                <Google/>
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
