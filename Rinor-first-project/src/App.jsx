import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';
import Hotels from './Hotels';
import Rooms from './Rooms';
import User from './User';
import Booking from './Booking';
import LogoImage from "./assets/logo.png";
import Login from './Verification/Login'
import Register from './Verification/Register'


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <React.Fragment>
        <div>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h4">
                  <img src={LogoImage} alt="Logo" style={{ justifyContent: 'flex-start', height: 60, width: 150, marginRight: 8 }} />
                </Typography>
                <div style={{ marginLeft: 'auto' }}>
                <Button
  color="inherit"
  component={Link}
  to="/login"
  sx={{ '&:hover': { backgroundColor: 'yellow', color: 'black' } }}
>
  Login
</Button>
<Button
  color="inherit"
  component={Link}
  to="/register"
  sx={{ '&:hover': { backgroundColor: 'yellow', color: 'black' } }}
>
  Register
</Button>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {[
                  { text: 'Dashboard', icon: <InboxIcon />, path: '/dashboard' },
                  { text: 'User', icon: <MailIcon />, path: '/user' },
                  { text: 'Hotels', icon: <InboxIcon />, path: '/hotels' },
                  { text: 'Rooms', icon: <MailIcon />, path: '/rooms' },
                  { text: 'Booking', icon: <InboxIcon />, path: '/booking' },
                ].map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton component={Link} to={item.path}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Drawer>
            <Main open={open}>
              <DrawerHeader />
              <Routes>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/user" element={<User />} />
  <Route path="/hotels" element={<Hotels />} />
  <Route path="/rooms" element={<Rooms />} />
  <Route path="/booking" element={<Booking />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>

            </Main>
          </Box>
        </div>
      </React.Fragment>
    </Router>
  );
}
