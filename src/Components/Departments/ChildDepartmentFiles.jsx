import React , { useEffect , useState } from 'react';
import { useParams }                    from "react-router-dom";
import axios                            from "axios";
import FilesDisplay                     from "./FilesDisplay";
import { Box }                          from "@mui/material";

function ChildDepartmentFiles ( props ) {
    const { id } = useParams ();
    const [ department , setDepartment ] = useState ( [] );

    useEffect ( () => {
        axios.get ( `${process.env.REACT_APP_API_NEST_URL}/department-search/department-by-id/${ id }` )
             .then ( ( res ) => {
                 setDepartment ( [ res.data] );
             } )
             .catch ( error => {
                 console.log ( error );

             } );
    }, [] );
    return (
        <>

            <Box sx={ {
                display : 'flex' , justifyContent : 'center' , alignItems : 'center' , margin : 'auto' ,
                paddingTop : '5rem' ,
            } }>
                { department.length > 0 ? <FilesDisplay department={ department }/> : null }
            </Box>
        </>
    );
}

export default ChildDepartmentFiles;