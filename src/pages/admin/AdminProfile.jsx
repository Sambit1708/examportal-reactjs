import * as React from "react";
import { Box, Button, CssBaseline, Stack, TextField, Typography } from "@mui/material";
import SideBar from "../../components/SideBar";
import './assets/AdminProfile.css'
import Divider from '@mui/material/Divider';
import UserService from "../../services/UserService";
import Swal from "sweetalert2";
import SettingsIcon from '@mui/icons-material/Settings';
// import swal from "sweetalert";

const AdminProfile = () => {

    const [profile, setProfile] = React.useState({})
    const editFormReference = React.useRef()
    const [editBtn, setEditBtn] = React.useState(true)

    const getUser = () => {
        try {
            const user = UserService.getUsers();
            setProfile(user)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getUser();
    }, [])

    const editFunc = () => {
        setEditBtn(false);
    }

    const Cancel = () => {
        setEditBtn(true)
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
            <Box className='profile-box' sx={{ml: '180px', mt: '80px'}}>
                <div className='container'>
                    <div className='profile-edit'>
                        <Button variant='contained' color='secondary' startIcon={<SettingsIcon />} onClick={() => editFunc()}>Edit</Button>
                    </div>
                    <Typography variant='h4' 
                                textAlign='center' 
                                sx={{marginBottom: '10px', textTransform:'uppercase'}}
                    >   <b>Profile Section</b>
                    </Typography>
                    <Divider sx={{ bgcolor: "secondary.light" }}  />
                    <Box sx={{marginTop: '50px'}}>
                        <Box component='form' ref={editFormReference} onSubmit={(event) => submitEditBtn(event)}>
                            <Stack container sx={{ mb: '10px', pl: 5 }}>
                                <Box component='div' className="px-3">
                                    <Box component='div' className='d-flex align-items-center justify-content-between' sx={{width: 600}}>
                                        <div style={{width:'200px'}}>
                                            <h5>First Name: </h5>
                                        </div>
                                        {editBtn 
                                            ? 
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <p>{`${profile.firstName}`}</p>
                                                </div>
                                            :
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <TextField sx={{width:'350px'}} 
                                                                defaultValue={`${profile.firstName}`} 
                                                                name="firstName" 
                                                                inputProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                    />
                                                </div>
                                        }
                                    </Box>
                                </Box>
                                <Box component='div' className="px-3 mt-3">
                                    <Box component='div' className='d-flex align-items-center justify-content-between' sx={{width: 600}}>
                                        <div style={{width:'200px'}}>
                                            <h5>Last Name: </h5>
                                        </div>
                                        {editBtn 
                                            ? 
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <p>{`${profile.lastName}`}</p>
                                                </div>
                                            :
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <TextField sx={{width:'350px'}} 
                                                                defaultValue={`${profile.lastName}`} 
                                                                name="lastName" 
                                                                inputProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                    />
                                                </div>
                                        }
                                    </Box>
                                </Box>
                                <Box component='div' className="px-3 mt-4">
                                    <Box component='div' className='d-flex align-items-center justify-content-between' sx={{width: 600}}>
                                        <div style={{width:'200px'}}>
                                            <h5>Email: </h5>
                                        </div>
                                        {editBtn 
                                            ?
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <p>{profile.email}</p>
                                                </div>
                                            :
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <TextField sx={{width:'350px'}} 
                                                                defaultValue={profile.email}
                                                                inputProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                    />
                                                </div>
                                        }
                                    </Box>
                                </Box>
                                <Box component='div' className="px-3 mt-4">
                                    <Box component='div' className='d-flex align-items-center justify-content-between' sx={{width: 600}}>
                                        <div style={{width:'200px'}}>
                                            <h5>Username: </h5>
                                        </div>
                                        {editBtn
                                            ?
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <p>{profile.username}</p>
                                                </div>
                                            :
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <TextField sx={{width:'350px'}} 
                                                                defaultValue={profile.username}
                                                                inputProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                    />
                                                </div>
                                        }
                                    </Box>
                                </Box>
                                <Box component='div' className="px-3 mt-4 py-2">
                                    <Box component='div' className='d-flex align-items-center justify-content-between' sx={{width: 600}}>
                                        <div style={{width:'200px'}}>
                                            <h5>Phone: </h5>
                                        </div>
                                        {editBtn
                                            ?
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <p>{profile.phone}</p>
                                                </div>
                                            :
                                                <div style={{width:'400px', paddingTop: '6px'}}>
                                                    <TextField sx={{width:'350px'}} 
                                                                defaultValue={profile.phone}
                                                                inputProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {fontFamily: 'poppins'}
                                                                }}
                                                    />
                                                </div>
                                        }
                                    </Box>
                                </Box>
                                {!editBtn && 
                                    <Box component='div' className='form-btn'>
                                        <Button type='submit' variant='contained' color='success'>Submit</Button>
                                        <Button onClick={() => Cancel()} variant='contained' color='error'>Cancel</Button>
                                    </Box>
                                }
                            </Stack>
                        </Box>
                    </Box>
                </div>
            </Box>
        </Box>
    )
}

export default AdminProfile;