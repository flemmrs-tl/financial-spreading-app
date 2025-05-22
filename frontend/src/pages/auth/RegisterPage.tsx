import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  useTheme,
} from '@mui/material';

import { register, clearError } from '../../features/auth/authSlice';
import { RootState, AppDispatch } from '../../store';
import TradeLedgerLogo from '../../components/brand/TradeLedgerLogo';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username should be at least 3 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  firstName: Yup.string(),
  lastName: Yup.string(),
});

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const RegisterPage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: RegisterFormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    const { username, email, password, firstName, lastName } = values;
    await dispatch(register({ username, email, password, firstName, lastName }));
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(135deg, #076CF2 0%, #05122E 100%)',
        py: 4,
      }}
    >
      <Box 
        sx={{ 
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TradeLedgerLogo 
          color="white" 
          sx={{ fontSize: { xs: 140, sm: 160, md: 180 } }} 
        />
      </Box>

      <Container component="main" maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2,
            }}
          >
            <Typography component="h1" variant="h5" color="primary" sx={{ mb: 3, fontWeight: 500 }}>
              Financial Spreading Application
            </Typography>

            <Typography component="h2" variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>
              Create your account
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{ mt: 2, width: '100%' }}
                onClose={() => dispatch(clearError())}
              >
                {error}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form style={{ width: '100%', marginTop: '1rem' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        autoComplete="given-name"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                  </Button>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link component={RouterLink} to="/login" variant="body2" color="primary">
                      Already have an account? Sign in
                    </Link>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="white">
              © {new Date().getFullYear()} Trade Ledger. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;