import React from 'react'
import { Box, Typography } from '@mui/material'
import { CardContainer, CardTitle } from '../../styles/Cases'

const CaseCard = ({id, title, court, date, appeal, result}) => {
  return (
    <CardContainer >
        <Box sx= {{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <CardTitle sx={{
            maxWidth: '60%'
          }}>
            {title?title:null}
          </CardTitle>
          <CardTitle>
            {court?court:null}
          </CardTitle>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography><span style={{ fontWeight: 'bold' }}>Dated: </span>{date?date:null}</Typography>
          <Typography sx={{
            marginLeft: '1.5rem' 
          }}><span style={{ fontWeight: 'bold' }}>Result: </span>{result?result:null}</Typography>
        </Box>
        <Typography ><span style={{ fontWeight: 'bold' }}>Case No: </span>{appeal?appeal:null}</Typography>
        {/* <Typography>
        <span style={{ fontWeight: 'bold' }}>Citation: </span>{citations ? citations[0].citation : "None"}
        </Typography> */}
    </CardContainer> 
  )
}

export default CaseCard