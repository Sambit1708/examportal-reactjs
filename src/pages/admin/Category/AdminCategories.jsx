import * as React from 'react';
import { Box } from '@mui/material'
import SideBar from '../../../components/SideBar'
import '../assets/AdminCategory.css'
import CategoryIcon from '@mui/icons-material/Category';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CategoryService from '../../../services/CategoryService';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function AdminCategories() {
  const [categories, setCategories] = React.useState([])

  const getCategoriesData = async () => {
    try {
        const result = await CategoryService.getAllCategories();
        setCategories(result.data)
    } catch (error) {
        swal("Something went wrong!!", `${error}`, "error");
    }
  }

  React.useEffect(() => {
    getCategoriesData();
  }, [])
  const navigator = useNavigate()
  return (
    <div>
        <Box height={30} />
        <Box sx={{display: 'flex'}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'15px' }}>
                <div className='container container-card'>
                    <List
                        sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                        <ListSubheader sx={{ fontFamily: "poppins" }} component="div" id="nested-list-subheader">
                            Categories
                        </ListSubheader>
                        }
                        id="list-item"
                    >   
                        {categories.map((item) => (
                            <div key={item.cid} className='list-card-text'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CategoryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span style={{ fontFamily: "poppins" }}>{item.title}</span>}
                                                    secondary={<span style={{ fontFamily: "poppins" }}>{item.description}</span>} 
                                    />
                                    </ListItemButton>
                                <Divider sx={{ borderColor: "black",width:'100%', minWidth: '600px'}}/>
                            </div>
                        ))}
            
                        <div className='text-center'>
                            <Button onClick={() => navigator('/Admin/Category/Add')} 
                                    className='mt-2' variant="contained" color="error"
                                    sx={{ fontFamily: "poppins" }}
                            >
                                Add New Category
                            </Button>
                        </div>
                        
                    </List>
                </div>
            </Box>
        </Box>
    </div>
  )
}
