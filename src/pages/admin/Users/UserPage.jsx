import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TablePagination } from '@mui/material';
import SideBar from '../../../components/SideBar';
import UserService from '../../../services/UserService';
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserData = () => {

  const [users, setUsers] = React.useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const fetchAllUsers = async () => {
    try {
      const result = await UserService.getAllUsers();
      setUsers(result.data)

    } catch(error) {
      Swal.fire('Something went wrong!', `${error}`, "error");
    }
  }

  React.useEffect(() => {
    fetchAllUsers();
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
      <Box sx={{display: 'flex'}}>
          <SideBar />
          <Box sx={{marginLeft: '20px', marginTop: '80px', width: '100%'}}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer component={Paper} >
                  <Table sx={{ maxWidth: 1000, margin:'auto', marginBottom:'50px', border: '1px solid #e5e5e5' }} aria-label="customized table">
                      <TableHead>
                          <TableRow>
                              <StyledTableCell>Email Address</StyledTableCell>
                              <StyledTableCell align="right">First Name</StyledTableCell>
                              <StyledTableCell align="right">Last Name</StyledTableCell>
                              <StyledTableCell align="right">Phone</StyledTableCell>
                              <StyledTableCell align="right">Username</StyledTableCell>
                              <StyledTableCell align="center">Actions</StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {users.map((row) => (
                          <StyledTableRow key={row.id}>
                              <StyledTableCell component="th" scope="row">
                                  {row.email}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.firstName}</StyledTableCell>
                              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                              <StyledTableCell align="right">{row.phone}</StyledTableCell>
                              <StyledTableCell align="right">{row.userName}</StyledTableCell>
                              <StyledTableCell align="center" width='230px'>
                                  <Button disabled={!row.enabled} variant='contained' color='error' sx={{marginRight: '4px'}}>InActive</Button>
                                  <Button disabled={row.enabled} variant='contained' color='primary'>Active</Button>
                              </StyledTableCell>
                          </StyledTableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
      </Box>
  );
}
export default UserData