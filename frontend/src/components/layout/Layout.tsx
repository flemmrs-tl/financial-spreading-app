import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Layout: React.FC = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { sm: sidebarOpen ? 30 : 7 },
          transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;