import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { Colors } from '../../../styles/theme'
import { useNavigate } from "react-router-dom";


const CustomInfoCard = ({ title, data, dataId}) => {

    const navigation = useNavigate();
  
  return (
    
    <Paper 
    
    sx={{
        marginBottom: '5rem',
        padding: '2rem'
    }}>
        <Typography sx={{
            fontSize: '1.5rem',
            textAlign: 'center',
            fontWeight: '500',
            color: Colors.secondary
        }}>{ title }</Typography>
        <Box sx={{
            marginTop: '1.5rem'
        }}>
            {
                data && data.map((item,key) => (
                    <Box 
                    
                    onClick={ ()=> {
                        
                        console.log(item, key, dataId[key]);
                                           
                        navigation('/legislation', {state:{data:dataId[key]}});            

                       
                    }}
                    sx={{
                        padding: '1rem',
                        borderBottom: '1px solid black',
                        borderColor: Colors.secondary,
                        cursor: 'pointer',
                        transition: 'all .3s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(128,128,128,.1)',
                        }
                    }}>
                        {  item.title}
                    </Box>
                ))
            }
        </Box>
    </Paper>
  
  )
}

export default CustomInfoCard