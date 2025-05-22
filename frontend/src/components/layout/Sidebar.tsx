import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  styled,
  useTheme,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import CalculateIcon from '@mui/icons-material/Calculate';
import InsightsIcon from '@mui/icons-material/Insights';

import { RootState } from '../../store';
import TradeLedgerLogo from '../common/TradeLedgerLogo';

const drawerWidth = 240;
const closedDrawerWidth = 56;

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  '&.active .MuiListItemButton-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
  '&:hover .MuiListItemButton-root:not(.active .MuiListItemButton-root)': {
    backgroundColor: 'rgba(7, 108, 242, 0.08)',
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Clients', icon: <BusinessIcon />, path: '/clients' },
  { text: 'Documents', icon: <ArticleIcon />, path: '/documents' },
  { text: 'Financials', icon: <CalculateIcon />, path: '/financials' },
  { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
  { text: 'Analytics', icon: <InsightsIcon />, path: '/analytics' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const theme = useTheme();
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : closedDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : closedDrawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ height: 64 }} /> {/* Spacer to push content below app bar */}
      
      {sidebarOpen && (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
            FINANCIAL SPREADING
          </Typography>
        </Box>
      )}
      
      <Divider />
      
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <StyledNavLink to={item.path} end={item.path === '/'}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  borderRadius: sidebarOpen ? '0 24px 24px 0' : '50%',
                  mx: sidebarOpen ? 1 : 'auto',
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 2 : 'auto',
                    justifyContent: 'center',
                    color: theme.palette.primary.main,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    opacity: sidebarOpen ? 1 : 0,
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    }
                  }} 
                />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      {sidebarOpen && (
        <Box sx={{ p: 2, mt: 2, mb: 2 }}>
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              borderRadius: 1,
              backgroundColor: 'rgba(7, 108, 242, 0.05)',
            }}
          >
            <Box sx={{ mb: 1 }}>
              <TradeLedgerLogo variant="mark" height={24} />
            </Box>
            <Typography variant="caption" color="text.secondary" align="center">
              Financial Spreading App
              <br />
              © {new Date().getFullYear()} Trade Ledger
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;