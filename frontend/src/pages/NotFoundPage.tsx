import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={3}
    >
      <Paper sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
        <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;