import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryService from '../services/CategoryService'
import swal from 'sweetalert';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import HomeIcon from '@mui/icons-material/Home';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 200;


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




const UserSideBar = (props) => {

  const { window } = props;
  const [categories, setCategories] = React.useState([])
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate()
  const [getNav, setGetNav] = React.useState(false)
  const [navBar, setNavBar] = React.useState([
    {text: 'HOME', icon: <HomeIcon />, path: '/Admin'},
    {text: 'CONTACT', icon: <ContactsIcon />, path: '/Admin'},
  ])


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const container = window !== undefined ? () => window().document.body : undefined;

  const getCategoriesData = async () => {
    try {
      const result = await CategoryService.getAllCategories();
      setCategories(result.data)
    } catch (error) {
      swal("Something went wrong!!", `${error}`, "error");
    }
  }

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
    getCategoriesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Logout = () => {
    LoginService.logout();
    navigate('/login')
  }

  const drawer = (
    <React.Fragment>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={'0'} disablePadding>
          <ListItemButton onClick={() => {navigate('/User/Quiz/0')}}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={'ALL Category'} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {categories.map((item, index) => (
          <div key={item.title}>
            <ListItem key={item.title} disablePadding>
              <ListItemButton  onClick={() => {navigate(`/User/Quiz/${item.cid}`)}}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
        <ListItem key={'1'} disablePadding>
          <ListItemButton onClick={() => Logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      
    </React.Fragment>
  );


  return (
    <React.Fragment>
      <AppBar position="fixed"  sx={{background: 'transparent'}}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <div style={{color:'black'}}><b>e<span style={{color:'blue'}}>X</span>am</b>portal</div>
          </Typography>
          <div className='d-flex justify-content-between ms-auto' style={{width:'300px'}}>
            {navBar.map((item) => (
              <p key={item.text} style={{ marginTop: '5px',color:'black', cursor:'pointer'}}>{item.text}</p>
            )) }
          </div>
        </Toolbar>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
      </AppBar>
      
    </React.Fragment>
  );
}
export default UserSideBar