import React                        from 'react';
import { Box , Paper , Typography } from "@mui/material";
import ArticleIcon                  from '@mui/icons-material/Article';

function FileCard ( props ) {
    const files = props.files;
    const file = files.length > 0 ? files[ 0 ] : files;


    return (
        <>
            <Paper elevation={ 3 } sx={ {
                minWidth : '25rem' , margin : '4rem' ,
            } }>
                <Box sx={ {
                    padding : '2rem'
                } }>
                    <Typography variant={ 'h5' } fontFamily={ 'Roboto' }>Title:</Typography>
                    <Typography variant={ 'body2' } fontFamily={ 'Poppins' }>{ file?.title }</Typography>
                    <Box sx={ {
                        display : 'flex' , flexDirection : 'row' , justifyContent : 'flex-start' ,
                        alignItems : 'center' , marginTop : '1rem' , cursor : 'pointer'
                    } }>
                        <ArticleIcon sx={ {
                            fontSize : '2rem' , color : 'mediumvioletred' ,
                        } }/>
                        <Typography variant={ 'body2' } fontFamily={ 'Roboto' }
                                    fontWeight={ 'bolder' }>{ file?.wordFile }</Typography>
                    </Box>
                </Box>
            </Paper>
        </>
    );
}

export default FileCard;