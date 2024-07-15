import * as React from 'react';
import { Box } from '@mui/material';
import SideBar from '../../../components/SideBar';
import PreLoading from '../../../components/PreLoading';
import ResultService from '../../../services/ResultService'


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
  

const AdminResultPage = () => {
    const [ preLoading, setPreLoading ] = React.useState(false);
    const [ results, setResults ] = React.useState([]);

    const getResultOfQuiz = async (id) => {
        try {
            const resultResponse = await ResultService.getAllResultOfQuiz(id);
            if(resultResponse.status === 200) {
                setResults([...resultResponse.data]);
                setPreLoading(false);
            }
        } catch(error) {}
    }

    const getAllResults = async (id) => {
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
                  <th className='bg-info text-white text-center'>First Name</th>
                  <th className='bg-info text-white text-center'>Last Name</th>
                  <th className='bg-info text-white text-center'>Quiz Name</th>
                  <th className='bg-info text-white text-center'>Total Question</th>
                  <th className='bg-info text-white text-center'>Attempted</th>
                  <th className='bg-info text-white text-center'>Correct</th>
                  <th className='bg-info text-white text-center'>Mark</th>
                  <th className='bg-info text-white text-center'>Full Mark</th>
                </tr>
            </thead>
            <tbody>
                {results.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{ row.user.firstName }</td>
                        <td style={{ textAlign: 'center' }}>{ row.user.lastName }</td>
                        <td style={{ textAlign: 'center' }}>{ row.quiz.title }</td>
                        <td style={{ textAlign: 'center' }}>{ row.quiz.noOfQuestions }</td>
                        <td style={{ textAlign: 'center' }}>{ row.attempted }</td>
                        <td style={{ textAlign: 'center' }}>{ row.correct }</td>
                        <td style={{ textAlign: 'center' }}>{ row.mark }</td>
                        <td style={{ textAlign: 'center' }}>{ row.quiz.maxMark }</td>
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
    )
}

export default AdminResultPage