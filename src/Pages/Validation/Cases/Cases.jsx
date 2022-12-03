import { useContext } from "react";
import { Box, ThemeProvider } from "@mui/material";
import {
  CasesContext,
} from "../../../context/cases.context";
import { CasesTitle, SearchDivider } from "../../../styles/Cases";
import SearchByTitle from "../../../Components/Cases/SearchByTitle";
import SearchByCitation from "../../../Components/Cases/SearchByCitation";
import CasesList from "../../../Components/Cases/CasesList";
import LoadingScreen from "../../../Components/Cases/LoadingScreen";
import theme from "../../../styles/theme";

const Cases = () => {
  const { loading } = useContext(CasesContext);
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CasesTitle>Cases</CasesTitle>
        <SearchByTitle />
        <SearchDivider />
        <SearchByCitation />
      </Box>
      <CasesList />
      { loading && <LoadingScreen /> }
    </ThemeProvider>
  );
};

export default Cases;
