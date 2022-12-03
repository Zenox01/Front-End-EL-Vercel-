import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { Colors } from '../../styles/theme'
import { useNavigate } from "react-router-dom";


const InfoCard = (props: { title: string; data:any;}) => {

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
        }}>{ props.title }</Typography>
        <Box sx={{
            marginTop: '1.5rem'
        }}>
            {
                props.data && props.data.map((item: { id: any; _id: { $oid: any; }; name: any; title: any; citation: any; appeal: any; label: any; }) => (
                    <Box 
                    
                    onClick={()=> {
                        
                        console.log(item.id);
                        navigation('/judgment', { state: { data: item._id?.$oid || item?._id || item?.id }})
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
                        { item.name || item.title || item.citation || item.appeal || item.label || item}
                    </Box>
                ))
            }
        </Box>
    </Paper>
  
  )
}

export default InfoCard