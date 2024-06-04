import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Person4Icon from "@mui/icons-material/Person4";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Dashboard from "./Hotel_Management/Dashboard/Dashboard";
import Hotels from "./Hotel_Management/Hotels/Hotels";
import Rooms from "./Hotel_Management/Rooms/Rooms";
import User from "./Hotel_Management/Users/User";
import Booking from "./Hotel_Management/Bookings/Booking";
import LogoImage from "./assets/logo.png";
import LoginForm from "./Verification/Login";
import RegisterForm from "./Verification/Register";
import Singlehotel from "./Hotel_Management/Hotels/SingleHotel";
import SingleUsers from "./Hotel_Management/Users/SingleUsers";
import RoomDetails from "./Hotel_Management/Rooms/singleRoom.jsx";

/////<<<<<<<<<<<<<< Various Imports >>>>>>>>>>>>>>/////
const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
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
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h4">
                  <img
                    src={LogoImage}
                    alt="Logo"
                    style={{
                      justifyContent: "flex-start",
                      height: 60,
                      width: 150,
                      marginRight: 8,
                    }}
                  />
                </Typography>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{
                      "&:hover": { backgroundColor: "orange", color: "black" },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    sx={{
                      "&:hover": { backgroundColor: "orange", color: "black" },
                    }}
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
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {[
                  {
                    text: "Dashboard",
                    icon: <DashboardIcon />,
                    path: "/dashboard",
                  },
                  { text: "User", icon: <Person4Icon />, path: "/user" },
                  { text: "Hotels", icon: <HotelIcon />, path: "/hotels" },
                  { text: "Rooms", icon: <MeetingRoomIcon />, path: "/rooms" },
                  {
                    text: "Booking",
                    icon: <EventAvailableIcon />,
                    path: "/booking",
                  },
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
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/user" element={<User />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/booking" element={<Booking />} />
                <Route path='/room/:hotelId/:roomId' element={<RoomDetails />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/hotel/:id" element={<Singlehotel />} />
                <Route path="/user/:id" element={<SingleUsers />} />

              </Routes>
            </Main>
          </Box>
        </div>
      </React.Fragment>
    </Router>
  );
}
