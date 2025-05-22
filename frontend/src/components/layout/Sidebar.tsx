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
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

import { RootState } from '../../store';
import TradeLedgerLogo from '../brand/TradeLedgerLogo';

const drawerWidth = 240;
const closedDrawerWidth = 56;

const StyledNavLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  '&.active .MuiListItemButton-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Clients', icon: <PeopleIcon />, path: '/clients' },
  { text: 'Documents', icon: <ArticleIcon />, path: '/documents' },
  { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const location = useLocation();
  
  return (
    <Drawer
      variant="permanent"
      className="tl-sidebar"
      sx={{
        width: sidebarOpen ? drawerWidth : closedDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : closedDrawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: '#05122E', // Trade Ledger dark navy
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ 
        height: 64, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      }}>
        {sidebarOpen ? (
          <TradeLedgerLogo 
            color="white" 
            variant="mark" 
            sx={{ fontSize: 32 }} 
          />
        ) : (
          <TradeLedgerLogo 
            color="white" 
            variant="mark" 
            sx={{ fontSize: 24 }} 
          />
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      
      {sidebarOpen && (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)">
            FINANCIAL SPREADING
          </Typography>
        </Box>
      )}
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding className="tl-sidebar-item">
            <StyledNavLink to={item.path} end={item.path === '/'}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <ListItemIcon
                  className="tl-sidebar-item-icon"
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    opacity: sidebarOpen ? 1 : 0,
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.path ? 500 : 400,
                    }
                  }} 
                />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
        ))}
      </List>
      
      {sidebarOpen && (
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          width: '100%', 
          p: 2, 
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        }}>
          <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
            © 2025 Trade Ledger
          </Typography>
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;