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
  useTheme,
} from '@mui/material';

import { login, clearError } from '../../features/auth/authSlice';
import { RootState, AppDispatch } from '../../store';
import TradeLedgerLogo from '../../components/brand/TradeLedgerLogo';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    await dispatch(login(values));
  };

  return (
    <Box 
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(135deg, #076CF2 0%, #05122E 100%)',
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

      <Container component="main" maxWidth="xs" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
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
              Sign in to your account
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
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form style={{ width: '100%', marginTop: '1rem' }}>
                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                  </Button>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link component={RouterLink} to="/register" variant="body2" color="primary">
                      {"Don't have an account? Sign Up"}
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

export default LoginPage;