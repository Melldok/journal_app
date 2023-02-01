
// We have to change the name of the Link because it has the same as the one from mui, then we can use it
import { useMemo, useState } from 'react'
import { Link as RouterLink} from 'react-router-dom'

import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'





export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {state, errorMessage} = useSelector( state => state.auth);
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);


  const formData = {
    email: '',
    password: '',
    displayName: ''
  }

  //Form validation object. Same names as attributes we want to validate. 
  const formValidations = {
    // In this object, first argument of each array is the condition to fullfil, and the second is the message that will be returned
    email: [ (value) => value.includes('@'), 'Email should have an @'],
    password: [ (value) => value.length >= 6, 'Password should be longer than 6 characters'],
    displayName: [ (value) => value.length >= 1, 'Name is mandatory']
  }




  const { 
    formState, displayName, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid 
  } = useForm(formData, formValidations)

  
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    // console.log(formState)

    if(!isFormValid) return

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (

    <AuthLayout title='Register' className="animate__animated animate__fadeIn">

          <form onSubmit={onSubmit}
          className="animate__animated animate__fadeIn"> 
              <Grid container>
                  <Grid item xs={12} sx={{ mt: 2 }} >
                    <TextField 
                      label="Complete Name" 
                      type="text" 
                      placeholder="Complete Name" 
                      fullWidth 
                      name='displayName'
                      value={displayName}
                      onChange={onInputChange}
                      error={ !!displayNameValid && formSubmitted } // If name is invalid, show helper
                      helperText={displayNameValid}
                      />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }} >
                    <TextField 
                      label="Email" 
                      type="email" 
                      placeholder="email@google.com" 
                      fullWidth
                      name='email'
                      value={email}
                      onChange={onInputChange}
                      error={ !!emailValid  && formSubmitted} 
                      helperText={emailValid}
                       
                      />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField 
                      label="Password" 
                      type="password" 
                      placeholder="password" 
                      fullWidth
                      name='password'
                      value={password}
                      onChange={onInputChange}
                      error={ !!passwordValid  && formSubmitted} 
                      helperText={passwordValid} />
                  </Grid>

                  <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
                    
                    <Grid 
                    item 
                    xs={12}
                    display={ !!errorMessage ? '' : 'none'}
                    >
                      <Alert severity='error'>{errorMessage}</Alert>
                    </Grid>
                    
                    <Grid item xs={12} >
                      <Button 
                        disabled={isCheckingAuthentication}
                        type="submit"
                        variant="contained" 
                        fullWidth>
                        Create Account
                      </Button>
                    </Grid>
                  </Grid>
                  
                  <Grid container direction="row" justifyContent="end" >
                    <Typography sx={{mr:1}} >Already have an account?</Typography>
                    {/* This link is coming from mui, and is being rendered as a component from router dom, which is also called link, so we renamed it to RouterLink */}
                    <Link component={RouterLink} color="inherit" to="/auth/login" >
                    Login
                    </Link>
                    

                  </Grid>

              </Grid>
            </form>
    </AuthLayout>




    
  )
}

