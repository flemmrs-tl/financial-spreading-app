import { Box, Typography, Paper, Grid } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Documents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No recent documents found.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Active Clients
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No active clients found.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Financial Metrics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No metrics available.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;