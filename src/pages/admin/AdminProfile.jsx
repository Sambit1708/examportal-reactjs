import * as React from "react";
import { Avatar, Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import SideBar from "../../components/SideBar";
import './assets/AdminProfile.css'
import Divider from '@mui/material/Divider';
import UserService from "../../services/UserService";
import Swal from "sweetalert2";
// import swal from "sweetalert";

const AdminProfile = () => {

    const [profile, setProfile] = React.useState({})

    React.useEffect(() => {
        setProfile(UserService.getUsers());
    }, [])

    const editFormReference = React.useRef()

    const editFunc = () => {
        const editInput = document.getElementsByTagName('input')
        for(let i=0; i<editInput.length; i++) {
            editInput[i].removeAttribute('disabled')
            editInput[i].style.color='black'
        }
        const formBtn = document.getElementsByClassName('form-btn');
        formBtn[0].classList.remove('d-none')
        editFormReference.current.fName.value=profile.firstName
        editFormReference.current.lName.value=profile.lastName
        editFormReference.current.email.value=profile.email
        editFormReference.current.phone.value=profile.phone
    }
    const Cancel = () => {
        const hide = document.getElementsByClassName('form-btn');
        hide[0].classList.add('d-none')
        const editInput = document.getElementsByTagName('input')
        for(let i=0; i<editInput.length; i++) {
            editInput[i].setAttribute('disabled', 'true')
        }
    }
    const updateUser = async (admin) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const result = await UserService.updateUser(admin)
            Swal.fire("Done", "User updated Successfully.", 'success')
        } catch (error) {
            Swal.fire("Something went wrong", `${error}`, 'error')
        }
    }

    const submitEditBtn = (event) => {
        event.preventDefault();
        const admin = {
            id:profile.id,
            firstName: `${editFormReference.current.fName.value}`,
            lastName: `${editFormReference.current.lName.value}`,
            email: `${editFormReference.current.email.value}`,
            password: `${editFormReference.current.password.value}`,
            phone: `${editFormReference.current.phone.value}`
        }
        updateUser(admin);
    }

    return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SideBar />
        <Box className='profile-box' sx={{marginLeft: '20px', marginTop: '80px'}}>
            <div className='container'>
                <Grid container>
                    <Grid item xs={3} className='profile-avatar-box'>
                        <div className='avatar-section'>
                            <Avatar
                                alt="Adyasha"
                                src='https://drive.google.com/uc?export=view&id=1rieshCiK86jIqrloZ0A9TJVbkN2yx6yo'
                                sx={{ width: 150, height: 150, margin: 'auto' }}
                            />
                        </div>
                        <div className='other'>
                            <Typography paragraph sx={{marginLeft: 1}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                                enim praesent..
                            </Typography>
                        </div>
                        <div className='avatar-btn'>
                            <button>Read More</button>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className='profile-edit'>
                            <Button variant='contained' onClick={() => editFunc()}>Edit</Button>
                        </div>
                        <Typography variant='h4' 
                                    textAlign='center' 
                                    sx={{marginBottom: '10px', textTransform:'uppercase'}}
                        >   <b>Profile Section</b>
                        </Typography>
                        <Divider />
                        <Box sx={{marginTop: '50px'}}>
                            <form ref={editFormReference} onSubmit={(event) => submitEditBtn(event)}>
                                <Grid container>
                                    {/*TODO: First Grid */}
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={4} sx={{ display:'flex', flexDirection:'column' }} >
                                        <label>First Name</label>
                                        <input type='text' disabled style={{ height:'50px' }} name="fName" />    
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={4} sx={{ display:'flex', flexDirection:'column' }} > 
                                        <label>Last Name</label>
                                        <input type='text' disabled style={{ height:'50px' }} name="lName" />     
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <div className='grid-gap'></div>
                                    {/*TODO: Second Grid */}
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={4} sx={{ display:'flex', flexDirection:'column' }} >
                                        <label>Email</label>
                                        <input type='email' disabled style={{ height:'50px' }} name="email" />   
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={4} sx={{ display:'flex', flexDirection:'column' }} >
                                    <label>Phones</label>
                                    <input disabled style={{ height:'50px' }} name="phone"   />    
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <div className='grid-gap'></div>
                                </Grid>
                                <div className='form-btn d-none'>
                                    <Button type='submit' variant='contained' color='success'>Submit</Button>
                                    <Button onClick={() => Cancel()} variant='contained' color='error'>Cancel</Button>
                                </div>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Box>
    </Box>
    )
}

export default AdminProfile;