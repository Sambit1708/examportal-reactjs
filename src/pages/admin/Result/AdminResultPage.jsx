import * as React from 'react';
import { alpha, Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import { TableHead, TablePagination, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import SideBar from '../../../components/SideBar';
import PreLoading from '../../../components/PreLoading';
import ResultService from '../../../services/ResultService'
import PropTypes from 'prop-types';
import { ThreeCircles } from 'react-loader-spinner'


function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all produccts',
            }}
          />
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            First Name
          </Typography>
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            Last Name
          </Typography>
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            Quiz Name
          </Typography>
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            Questions
          </Typography>
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            Attempted
          </Typography>
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            Correct
          </Typography>
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            Mark
          </Typography>
        </TableCell>
        <TableCell>
          <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
            Total Mark
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%', fontFamily: "poppins" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontFamily: "poppins" }}
          variant="h6"
          fontWeight="bold"
          id="tableTitle"
          component="div"
        >
          Results
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const AdminResultPage = () => {
  const [ preLoading, setPreLoading ] = React.useState(true);
  const [ preLoadingResult, setPreLoadingResult ] = React.useState(true);
  const [ results, setResults ] = React.useState([]);
  const [ firstName, setFirstName ] = React.useState('');
  const [ lastName, setLastName ] = React.useState('');
  const [ quiz, setQuiz ] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const formRef = React.useRef();

  const FirstNameInput = () => {
    return (
      <TextField
          name="firstName"
          label="First Name"
          defaultValue={firstName}
          inputProps={{
            style: {fontFamily: 'poppins'}
          }}
          InputLabelProps={{
            style: {fontFamily: 'poppins'}
          }}
        />
    )
  }
  
  const LastNameInput = () => {
    return (
      <TextField
          name="lastName"
          label="Last Name"
          defaultValue={lastName}
          inputProps={{
            style: {fontFamily: 'poppins'}
          }}
          InputLabelProps={{
            style: {fontFamily: 'poppins'}
          }}
        />
    )
  }

  const QuizInput = () => {
    return (
      <TextField
          name="quiz"
          label="Quiz"
          defaultValue={quiz}
          inputProps={{
            style: {fontFamily: 'poppins'}
          }}
          InputLabelProps={{
            style: {fontFamily: 'poppins'}
          }}
        />
    )
  }

  const getResultOfQuiz = async (id) => {
      try {
          const resultResponse = await ResultService.getAllResultOfQuiz(id);
          if(resultResponse.status === 200) {
              setResults([...resultResponse.data]);
              setPreLoading(false);
          }
      } catch(error) {}
  }

  const getAllResults = async () => {
      try {
          const resultResponse = await ResultService.getAllResults();
          if(resultResponse.status === 200) {
              setResults([...resultResponse.data]);
              setPreLoading(false);
          }
      } catch(error) {}
  }

  React.useEffect(() => {
      const href = window.location.href;
      if(href.includes('results/by-quiz')) {
          getResultOfQuiz(href.slice(href.lastIndexOf('/')+1, href.length));
      } else {
          getAllResults();
      }
  }, [])


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = results.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(results).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [results, page, rowsPerPage],
  );

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

  const searchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const searchParams = Object.fromEntries(formData.entries());
    setFirstName(searchParams.firstName);
    setLastName(searchParams.lastName);
    setQuiz(searchParams.quiz);
    setTimeout(async () => {
      try {
        const resultResponse = await ResultService.getAllResultsBySearch(searchParams);
        if(resultResponse.status === 200) {
          setResults([...resultResponse.data]);
          setPreLoadingResult(true);
        }
      } 
      catch (error) {
        setResults([]);
        setPreLoadingResult(true);
      }
    }, 1000)
    setPreLoadingResult(false);
    
  }

  return (
    <Box sx={{display: 'flex'}}>
      <SideBar />
      <Box sx={{paddingLeft: '40px', marginTop: '65px', bgcolor: "#F7F7FF", minHeight: "570px", minWidth: "100%" }}>
        <Box sx={{width: "80%", border: '1px solid #f2f3f5', mb: 2, p: 1, mt: 4, bgcolor: "#fff" }}>
          <Box sx={{ display: "flex", alignItems: "center" }} 
                ref={formRef} component="form" onSubmit={searchSubmit} >
            <Box>
              <FirstNameInput />
            </Box>
            <Box sx={{ ml: 5 }}>
              <LastNameInput />
            </Box>
            <Box sx={{ ml: 5 }}>
              <QuizInput />
            </Box>
            <Box sx={{ ml: 5 }}>
              <Button variant='contained' type='submit'
                      sx={{ fontFamily: "poppins", width: "150px", height: "50px" }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
        <Paper sx={{ width: '80%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={results.length}
              />
              <TableBody>
                {preLoadingResult ? visibleRows
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell 
                          component="th"
                          id={labelId}
                        >
                            <Typography fontFamily="poppins">
                              {row.user.firstName}
                            </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontFamily="poppins">
                            {row.user.lastName}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography fontFamily="poppins">
                            {row.quiz.title}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography fontFamily="poppins">
                            {row.quiz.noOfQuestions}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography fontFamily="poppins">
                            {row.attempted}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography fontFamily="poppins">
                            {row.correct}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography fontFamily="poppins">
                            {row.mark}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography fontFamily="poppins">
                            {row.quiz.maxMark}
                          </Typography>
                        </TableCell>
                    </TableRow>
                    );
                }) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box sx={{ ml: 50 }}>
                        <ThreeCircles
                            visible={true}
                            height="30"
                            width="30"
                            color="#2874f0"
                            ariaLabel="three-circles-loading"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                        height: (53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} align='center'>No Data Found..</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={results.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default AdminResultPage