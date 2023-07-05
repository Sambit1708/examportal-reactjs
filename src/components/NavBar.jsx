import * as React from 'react'
import { AppBar, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import LoginIcon from '@mui/icons-material/Login';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

const DrawerComp = ({theme, onDrawerChange, navTabs, openDrawer, navigator}) => (
    <React.Fragment>
        <SwipeableDrawer anchor={'right'} open={openDrawer} onOpen={() => {}} onClose={onDrawerChange}>
                <IconButton  onClick={onDrawerChange}>
                    {theme.direction === 'ltr' ? <ChevronRightIcon sx={{marginRight: 'auto'}}/> : <ChevronLeftIcon />}
                </IconButton>
            <Divider />
            <List>
                {navTabs.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItemButton onClick={() => navigator(item.path)}>
                            <ListItemIcon >
                                {item.icon}
                                <ListItemText sx={{marginLeft:'10px', marginTop: '-0.1px'}}>{item.text}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </SwipeableDrawer>
    </React.Fragment>
)

const NavBar = () => {

    const navTab = [
                    {text: 'HOME', icon: <HomeIcon />, path: '/' },
                    {text: 'CONTACT', icon: <ContactsIcon />, path: '/' },
                    {text: 'LOGIN', icon: <LoginIcon />, path: '/login' }
    ]
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0)
    const [isUser, setUser] = React.useState(false)
    const [isStart, setStart] = React.useState(false)
    const [openDrawer, setOpenDrawer] = React.useState(false)
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const handleOpenDrawer = () => {
        setOpenDrawer(false)
    }

    React.useEffect(()=> {
        setUser(window.location.href.includes('Admin') || window.location.href.includes('User'))
        setStart(window.location.href.includes('start'))
    }, [])

    const navigateToPath = (path) => {
        navigate(path)
    }

    return (
    <React.Fragment>
        <AppBar component='nav' sx={{minHeight: '50px', backgroundColor: 'transparent', color:'black'}}>
            <Toolbar>
                {isUser ? isStart ? (
                    <Typography variant='h5' >
                        <b>e<span style={{color:'blue', fontSize:'1.5em'}}>X</span>am</b>portal
                    </Typography>
                ) : (<React.Fragment></React.Fragment>) : (
                    <Typography variant='h5' >
                        <b>e<span style={{color:'blue', fontSize:'1.5em'}}>X</span>am</b>portal
                    </Typography>
                )}
                {
                    isMatch ? (
                        <React.Fragment>
                            <IconButton 
                                sx={{ marginLeft:'auto', ...(openDrawer && { display: 'none' }) }} 
                                onClick={() => setOpenDrawer(!openDrawer)}
                            >
                                <MenuOpenIcon />
                            </IconButton>
                            <DrawerComp navigator={navigateToPath} theme={theme} onDrawerChange={handleOpenDrawer} navTabs={navTab} openDrawer={openDrawer} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Tabs sx={{ marginLeft:'auto' }} 
                                value={value} 
                                onChange={(e, value) => setValue(value)} 
                                indicatorColor='primary' 
                                textColor='inherit' 
                            >
                                {navTab.map((item, index) => (
                                    <Tab key={index} 
                                         onClick={(event) => {
                                                event.preventDefault();
                                                navigateToPath(item.path)
                                         }} 
                                         sx={{fontSize:'16px'}} 
                                         label={item.text} 
                                    />
                                ))}
                            </Tabs>
                        </React.Fragment>
                    )
                }
            </Toolbar>
        </AppBar>
    </React.Fragment>
    )
}
export default NavBar