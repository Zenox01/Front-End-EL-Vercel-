import { Box , styled , Typography , Button , ListItemText } from "@mui/material";
import { Colors }                                            from "../theme";
import { Link } from "react-router-dom";

export const FlexBox = styled ( Box ) ( ( { theme } ) => (
    {
        display : 'flex' ,
        flexDirection : 'row' ,
        flexWrap : 'wrap' ,
        justifyContent : 'space-between' ,
        alignItems : 'center' ,

        [ theme.breakpoints.down ( "md" ) ] : {
            flexDirection : 'column' ,
        }
    }
) );

export const Container = styled ( Box ) ( ( { theme } ) => (
    {
        display : 'flex' ,
        marginTop:'3rem',
    }
) );

export const ListText = styled ( ListItemText ) ( ( { theme } ) => (
    {
        borderBottom : '1px solid #ccc' ,
    }
));





