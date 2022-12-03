import React , { useEffect , useState }                  from 'react';
import { useParams,useNavigate }                         from "react-router-dom";
import axios                                             from "axios";
import { Container , FlexBox , ListText }                from "../../styles/Departments";
import { Box , Card , List , ListItem , ListItemButton } from "@mui/material";
import FilesDisplay                                      from "./FilesDisplay";

function ChildDepartments (  ) {
    const { id } = useParams ();
    const [ departments , setDepartments ] = useState ( [] );
    const [department,setDepartment] = useState([]);
    const navigate = useNavigate();

    useEffect ( () => {
        axios.get ( `${ process.env.REACT_APP_API_NEST_URL }/department-search/department-children/${ id }` )
             .then ( ( res ) => {
                console.log(res.data)
                 setDepartments ( res.data );
             } )
             .catch ( error => {
                 console.log ( error );

             } );

        axios.get(`${process.env.REACT_APP_API_NEST_URL}/department-search/department-by-id/${id}`)
             .then ( ( res ) => {
                 setDepartment ( [ res.data ] );
                 console.log("ASD: ", res.data)
             } )
             .catch ( error => {
                 console.log ( error );

             } );

    } , [] );

    const handleChange = (event) => {
        setDepartment(event);
        navigate(`/department/child/files/${event.id}`);
    }

    return (
        <>
            { departments && department?
              <>
                  {department.map(dp=>
                <h2 key={dp.id}>{dp.DeptName}!</h2>
                  )}
                
                <FlexBox>
                    <Box sx={{
                        marginLeft:'2rem',
                    }}>
                        <FilesDisplay department={department}/>
                    </Box>
                    <Container>
                        <Card sx={ {
                            width : '15rem' , height : 'auto' , boxShadow : '0 0 10px 0 rgba(0,0,0,0.2)' ,
                            padding : '3rem',margin:'2rem'
                        } }>
                            <List>
                                { departments.map ( ( department ) => (
                                    <ListItem disablePadding key={ department.id }>
                                        <ListItemButton component='a' onClick={()=>handleChange(department)}>
                                            <ListText>
                                                { department.DeptName }
                                            </ListText>
                                        </ListItemButton>
                                    </ListItem>
                                ) ) }
                            </List>
                        </Card>
                    </Container>
                </FlexBox>
            </> : null }
        </>
    );
}

export default ChildDepartments;