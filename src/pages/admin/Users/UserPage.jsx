import * as React from 'react';
import { Box, Button } from '@mui/material';
import SideBar from '../../../components/SideBar';
import UserService from '../../../services/UserService';
import Swal from 'sweetalert2';
import PreLoading from '../../../components/PreLoading';

const tableStyle = {
  backgroundColor: '#fff',
  color: 'rgba(0, 0, 0, 0.87)',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, 
              rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, 
              rgba(0, 0, 0, 0.12) 0px 1px 3px 0px`,
  marginTop: '30px'
}


const UserData = () => {

  const [users, setUsers] = React.useState([])
  const [ preLoading, setPreLoading ] = React.useState(true);

  const fetchAllUsers = async () => {
    try {
      const resultResponse = await UserService.getAllUsers();
      if(resultResponse.status === 200) {
        setPreLoading(false);
        setUsers(resultResponse.data)
      }

    } catch(error) {
      Swal.fire('Something went wrong!', `${error}`, "error");
    }
  }

  React.useEffect(() => {
    fetchAllUsers();
  }, [])

  const updateUser = async (data) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text:  `Do yo really wanted to ${data.enabled ? 'Active' : 'InActive'}, ${data.userName}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff0000',
        cancelButtonColor: '#1FC71F',
        confirmButtonText: `Yes ${data.enabled ? 'Active': 'INACTIVE'} it`
      }).then(async (result) => {
        if (result.isConfirmed) {

          const res = await UserService.userAction(data);
          if(res != null) {
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: `Action Performed: ${data.enabled ? 'Active': 'Inactive'} succussfully`,
            }).then((rslt) => {
              fetchAllUsers();
            })
            
          } else {
            Swal.fire("Unsuccessful", "Can't update the data", "error")
          }
        }
      })
      
    } catch (error) {
      Swal.fire("Error", `${error}`, "error")
    }
  }

  const activeUser = (row) => {
    const data = {
      userName: row.userName,
      enabled: false
    }
    updateUser(data);
  }

  const inActiveUser = (row) => {
    const data = {
      userName: row.userName,
      enabled: true
    }
    updateUser(data);
  }
  
  if(preLoading) {
    return (
      <Box sx={{display: "flex"}}>
        <SideBar />
        <Box sx={{ bgcolor: '#f7f7ff', minHeight: 580, flexGrow: 1 }}>
          <PreLoading />
        </Box>
      </Box>
    )    
  }
  
  return (
      <Box sx={{display: 'flex'}}>
        <SideBar />
        <Box sx={{marginLeft: '20px', marginTop: '80px', width: '1100px'}}>
          <table className="table table-bordered table-hover px-2" style={tableStyle}>
            <thead>
                <tr>
                  <th className='bg-info text-white text-center'>Email</th>
                  <th className='bg-info text-white text-center'>First Name</th>
                  <th className='bg-info text-white text-center'>Last Name</th>
                  <th className='bg-info text-white text-center'>Phone</th>
                  <th className='bg-info text-white text-center'>Username</th>
                  <th className='bg-info text-white text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{row.email}</td>
                        <td style={{ textAlign: 'center' }}>{row.firstName}</td>
                        <td style={{ textAlign: 'center' }}>{row.lastName}</td>
                        <td style={{ textAlign: 'center' }}>{row.phone}</td>
                        <td style={{ textAlign: 'center' }}>{row.userName}</td>
                        <td style={{ textAlign: 'center' }}>
                          <Button onClick={() => activeUser(row)} 
                                  disabled={!row.enabled} 
                                  variant='contained' 
                                  color='error' 
                                  sx={{ marginRight: '4px',
                                        background: '#ff0000',
                                        '&:hover': { background: '#ff0000' },
                                        '&:focus': { outline: 'none' } 
                                      }}> InActive
                          </Button>
                          <Button onClick={() => inActiveUser(row)}
                                  disabled={row.enabled} 
                                  variant='contained' 
                                  sx={{  background: '#1FC71F',
                                        '&:hover': { background: '#1FC71F' },
                                        '&:focus': { outline: 'none' } 
                                      }}> Active
                          </Button>
                        </td>
                      </tr>
                    )
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>List of Users</td>
              </tr>
            </tfoot>
          </table>
        </Box>
      </Box>
  );
}
export default UserData