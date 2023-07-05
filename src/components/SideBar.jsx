import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
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
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import QueueIcon from '@mui/icons-material/Queue';
import CategoryIcon from '@mui/icons-material/Category';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService';
import { Tab, Tabs } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import LoginIcon from '@mui/icons-material/Login';
import UserService from '../services/UserService';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideBar = () => {

  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [getNav, setGetNav] = React.useState(false)
  const [navBar, setNavBar] = React.useState([
    {text: 'HOME', icon: <HomeIcon />, path: '/Admin'},
    {text: 'CONTACT', icon: <ContactsIcon />, path: '/Admin'},
  ])

  React.useEffect(() => {
    if(!getNav) {
      if(LoginService.isLoggedin()) {
        UserService.getCurrentUser().then((result) => {
          const user = result.data
          var dnewData = {
            text: user.userName,
            icon:<LoginIcon />,
            path: '/User/Profile'
          }
          setNavBar(oldArray => [...oldArray, dnewData])
        })
        setGetNav(true)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const drawerUpperList = [
    {text:'Home', icon: <HomeIcon />, path: '/Admin' },
    {text:'Profile', icon: <AccountCircleIcon />, path: '/Admin/Profile' },
    {text:'Users', icon: <SupervisedUserCircleIcon />, path: '/Admin/Users' },
    {text:'Logout', icon: <LogoutIcon />, path: '/' }
  ]
  const drawerDownList = [
    {text:'Category', icon: <CategoryIcon />, path: '/Admin/Category' },
    {text:'Add Category', icon: <PlaylistAddCircleIcon />, path: '/Admin/Category/Add' },
    {text:'Quiz', icon: <QuizIcon />, path: '/Admin/Quiz' },
    {text:'Add Quiz', icon: <QueueIcon />, path: '/Admin/Quiz/Add' }
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigateToPath = (path) => {
    navigate(path);
  }

  const Logout = () => {
    LoginService.logout();
    navigate('/')
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" open={open} sx={{background: 'transparent'}}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <div style={{color:'black'}}><b>e<span style={{color:'blue'}}>X</span>am</b>portal</div>
          </Typography>
            <React.Fragment>
              <Tabs sx={{ marginLeft:'auto' }} 
                  value={value} 
                  onChange={(e, value) => setValue(value)} 
                  indicatorColor='primary' 
                  textColor='inherit' 
              >
                  {navBar.map((item, index) => (
                      <Tab onClick={() => navigateToPath(item.path)} key={index} sx={{fontSize:'16px', color:'black'}} label={item.text} />
                  ))}
              </Tabs>
          </React.Fragment>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {(drawerUpperList).map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={item.text === 'Logout' ? () => Logout() : (path) => navigateToPath(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {(drawerDownList).map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={(path) => navigateToPath(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
export default SideBar