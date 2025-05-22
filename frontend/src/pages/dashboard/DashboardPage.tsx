import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import InsightsIcon from '@mui/icons-material/Insights';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';

const DashboardPage: React.FC = () => {
  const theme = useTheme();

  // Mock data for dashboard stats
  const stats = [
    { title: 'Pending Documents', count: 5, icon: <AssignmentIcon fontSize="large" sx={{ color: theme.palette.primary.main }} /> },
    { title: 'Active Clients', count: 12, icon: <BusinessIcon fontSize="large" sx={{ color: theme.palette.primary.main }} /> },
    { title: 'Financial Statements', count: 28, icon: <DescriptionIcon fontSize="large" sx={{ color: theme.palette.primary.main }} /> },
  ];

  // Recent activity mock data
  const recentActivity = [
    { action: 'Document Upload', description: 'Q1 Financial Statement - ABC Corp', time: '10 mins ago' },
    { action: 'Financial Analysis', description: 'XYZ Industries - Annual Report', time: '45 mins ago' },
    { action: 'Client Added', description: 'Global Tech Solutions', time: '3 hours ago' },
    { action: 'Document Processed', description: 'Quarterly Statement - First National Bank', time: '5 hours ago' },
  ];

  // Metric cards
  const metrics = [
    { 
      title: 'Average Processing Time', 
      value: '2.5 min', 
      change: '-0.3 min', 
      isPositive: true,
      icon: <TrendingUpIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
    },
    { 
      title: 'Credit Utilization', 
      value: '64%', 
      change: '+2%', 
      isPositive: false,
      icon: <MonetizationOnIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
    },
    { 
      title: 'Financial Health Score', 
      value: '82/100', 
      change: '+3', 
      isPositive: true,
      icon: <InsightsIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="500" color="primary">
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ mr: 2 }}>{stat.icon}</Box>
              <Box>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {stat.count}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Metrics and Activity */}
      <Grid container spacing={3}>
        {/* Metrics */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardHeader 
              title="Key Metrics" 
              titleTypographyProps={{ 
                variant: 'h6',
                fontWeight: 'bold',
                color: theme.palette.primary.main
              }} 
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                {metrics.map((metric, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 1.5,
                      bgcolor: 'rgba(7, 108, 242, 0.05)',
                      borderRadius: 1,
                      mb: 1
                    }}>
                      <Box sx={{ mr: 2 }}>{metric.icon}</Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {metric.title}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {metric.value}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: metric.isPositive ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {metric.change}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardHeader 
              title="Recent Activity" 
              titleTypographyProps={{ 
                variant: 'h6',
                fontWeight: 'bold',
                color: theme.palette.primary.main
              }} 
            />
            <Divider />
            <CardContent>
              {recentActivity.map((activity, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', py: 1.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mt: 1, mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {activity.action}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                  {index < recentActivity.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;