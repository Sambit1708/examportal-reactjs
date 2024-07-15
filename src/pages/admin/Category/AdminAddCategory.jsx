import React, { useRef } from 'react'
import { Box } from '@mui/material'
import SideBar from '../../../components/SideBar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import swal from 'sweetalert'
import CategoryService from '../../../services/CategoryService';

export default function AdminAddCategory() {

    const formReference = useRef('')

    const createCategory = async (data) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await CategoryService.createCategory(data);
            swal("Done!", "Category Added Sucessfully", "success");
        } catch(error) {
            swal("Something Went Wrong!!",`${error}`, "error");
        }
    }

    const submitLoginForm = (event) => {
        event.preventDefault();

        const category = {
            title:`${formReference.current.title.value}`,
            description:`${formReference.current.description.value}`
        }

        if(category.title === '' || category.description === '') {
            swal("Invalid Input!!", "Title or Description can't be null", "error");
            return
        }
        createCategory(category);
    };

    return (
    <div>
        <Box height={30} />
        <Box sx={{display: 'flex'}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'15px', textAlign: "center" }}>
                <div className='container container-card p-5'>
                <h5 style={{textTransform: "uppercase", textDecoration: "underline"}}>Add Categoris</h5>
                    <form ref={formReference} onSubmit={(event) => submitLoginForm(event)}>
                        <div className='row'>
                            <TextField
                                id="title" label="Title"
                                className="mb-4" name='title'
                                InputLabelProps={{
                                    style: {fontFamily: 'poppins'}
                                }}
                                inputProps={{
                                    style: {fontFamily: 'poppins'}
                                }}
                            />
                            <TextField
                                id="description" label="Description"
                                name='description' multiline rows={6}
                                InputLabelProps={{
                                    style: {fontFamily: 'poppins'}
                                }}
                                inputProps={{
                                    style: {fontFamily: 'poppins'}
                                }}
                            />
                        </div>
                        <div>
                            <Button type='submit' className='mt-4' sx={{ fontFamily: 'poppins' }}
                                    variant="contained" color="error" >
                                Add New Category
                            </Button>
                        </div>
                    </form>
                </div>
            </Box>
        </Box>
    </div>
    )
}
