import React from 'react'
import { Box, Typography } from '@mui/material'
import { CardContainer, CardTitle } from '../../styles/Cases'

const CaseView = ({ title, court, date,type,caseId}) => {
    const showCase = (caseId) => {
        console.log(caseId)
    }
    return (
        <CardContainer onClick={()=>showCase(caseId)}>
            <Box sx= {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography variant={'h5'} sx={{
                    maxWidth: '60%',
                    color:'midnightblue',
                }}>
                    {title?title:null}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex',marginTop:'1rem' }}>
                <Typography><span style={{ fontWeight: 'bold' }}>Dated: </span>{date?date:null}</Typography>
                <Typography sx={{
                    marginLeft: '1.5rem'
                }}><span style={{ fontWeight: 'bold' }}>Type: </span>{type?type:null}</Typography>
                <Typography sx={{
                    marginLeft: '1.5rem'
                }}><span style={{ fontWeight: 'bold' }}>Court: </span>{court?court:null}</Typography>
            </Box>
        </CardContainer>
    )
}

export default CaseView