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

import { login, clearError } from '../../features/auth/authSlice';
import { RootState, AppDispatch } from '../../store';
import TradeLedgerLogo from '../../components/common/TradeLedgerLogo';

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

  // Gradient background style using Trade Ledger brand colors
  const backgroundStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    padding: theme.spacing(3),
  };

  return (
    <Box sx={backgroundStyle}>
      <Container component="main" maxWidth="sm">
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
          <Box sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
            <TradeLedgerLogo height={60} />
            
            <Typography variant="h5" sx={{ mt: 3, color: theme.palette.primary.main, fontWeight: 500 }}>
              Financial Spreading Application
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sign in to access your account
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{ mt: 2, width: '100%', mb: 2 }}
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
              <Form style={{ width: '100%' }}>
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
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    py: 1.5,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
                
                <Grid container>
                  <Grid item xs>
                    <Link component={RouterLink} to="/forgot-password" variant="body2" color="primary">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/register" variant="body2" color="primary">
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Trade Ledger™ | All Rights Reserved
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;