import { Box, Typography, TextField, Button, Divider, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import { Colors } from "../theme";

export const CasesTitle = styled(Typography) ((theme) => ({
    textAlign:'center',
    marginTop: '2rem',
    fontSize: '3rem',
    color: Colors.secondary,
}))

export const SearchContainer = styled(FormControl) ((theme) => ({
    width: '60%',
    margin: '3rem auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
}))

export const SearchBar = styled(TextField) ((theme) => ({
    flex: 1,
    fontSize: '2rem',
    marginRight: '1rem',
}))

export const SearchButton = styled(Button) ((theme) => ({
    color: '#fff',
    alignSelf: 'stretch',
    backgroundColor: Colors.secondary,
    transition: 'all .4s ease-out',
    '&:hover': {
        opacity: 0.7
    }
}))

export const SearchDivider = styled(Divider) ((theme) => ({
    width: '80%',
    margin: 'auto',
    backgroundColor: Colors.secondary,
}))

export const CardContainer = styled(Box) ((theme) => ({
    padding: '1rem',
    border: '1px solid #8e8e8e',
    marginTop: '1.5rem',
    borderColor: Colors.secondary,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all .4s ease-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.05)',
    }
}))

export const CardTitle = styled(Box) ((theme) => ({
    fontSize: '1.3rem',
    color: Colors.secondary
}))

export const ListContainer = styled(Box) ((theme) => ({
    width: '80%',
    margin: '5rem auto',
    display: 'flex',
    flexDirection: 'column',
}))