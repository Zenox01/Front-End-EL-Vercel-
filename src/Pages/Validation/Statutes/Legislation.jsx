import React, {useContext, useEffect,useState} from 'react'
import { useLocation} from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { Colors } from '../../../styles/theme'
import InfoCard from '../../../Components/Judgment/InfoCard'
import { CasesContext } from '../../../context/cases.context'
import axios from "axios";

const Legislation = () => {
    const [statutedbyId, setStatutebyId] = useState([]);
    const { state } = useLocation()
    const {casesSideBar,fetchSideCardCasesList}=useContext(CasesContext)
    const statuteid = state.data;
 
    
    useEffect(()=>{
        
        const fetchStatutebyId = async () => {
            try {
              const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/retrieve-whole-statute-by-id/${statuteid}`;
              const response = await axios.get(URL);
              console.log(response.data);
              setStatutebyId(response.data);
            } catch (error) {
              console.log(error);
            }
        
          };

          fetchStatutebyId();
        
        fetchSideCardCasesList(statuteid)

    },[statuteid])

  return (
    <Box sx={{
        display: 'flex',
        padding: '2rem'
    }}>
        <Box sx={{
            width: '30%'
        }}>
            <InfoCard
            title="Categories"
            data={ statutedbyId.categories }
             />
             <InfoCard
            title="Sections"
            data={statutedbyId.sections}
             /> 
             
             <InfoCard
             
             title="Cases"
             data={casesSideBar} />
           
        </Box>
        <Box sx={{
            padding: '1.5rem',
            flex: 1
        }}>
            <Typography sx={{
                fontSize: '2.5rem',
                color: Colors.secondary,
                textAlign: 'center'
            }} >{ statutedbyId.title }</Typography>
            <Typography sx={{
                textAlign: 'center',
                marginTop: '4rem'
            }}>{
              statutedbyId.files ? statutedbyId.files.map((file) => 
                <a style={{ display:'block' }} target="_blank" href={`http://localhost:3001/file-handler/get-pdf/${file.file_name}`}>{file.file_name}</a>):"No Current File Found to Display"
            }</Typography>
        </Box>
    </Box>
  )
}

export default Legislation