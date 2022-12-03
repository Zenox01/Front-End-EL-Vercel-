import { Link } from "@mui/material"
import {styled} from "@mui/system"
import { Colors } from "../../styles/theme/index"


export const NavLink = styled(Link) ({
    textDecoration: 'none',
    fontSize: '1.2rem',
    color: 'black',
    borderLeft: '1px solid',
    padding: '1rem',
    borderColor: Colors.secondary,
    transition: 'all .4s',
    '&:hover': {
        backgroundColor: '#e8e8e8',
        color: Colors.secondary
    }
})