import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CaseCard from "../../../Components/Cases/CaseCard";
import {
  SearchContainer,
  SearchBar,
  SearchButton,
  SearchDivider,
  ListContainer,
  CardContainer,
} from "../../../styles/Cases";
import LoadingScreen from "../../../Components/Cases/LoadingScreen";
import { CasesContext } from "../../../context/cases.context";
import { Colors } from "../../../styles/theme";

const Statutes = () => {
  const navigation = useNavigate();
  const { jurisdiction, SubGroup } = useParams();
  const [search, setSearch] = useState("");
  const [sectionDisplay, setSectionsDisplay] = useState([]);
  const [filteredStatutes, setFilteredStatutes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [titleslist, setTitles] = useState([]);
  const {
    fetchStatutesByTitleorYear,
    statutes,
    loading,
    fetchStatutesbyGroup,
    fetchStatutesbySubGroup,
    fetchStatutesbySubGroupType,

    fetchAllStatutes,
    statutesDropdown,
    sections,
    setSelectedStatuteID,
    fetchStatuteSections,
    selectedStatute,
    sectionId,
    setSectionID,
    cases,
    fetchCasebyStatueandSection,
    fetchSideCardCasesList,
  } = useContext(CasesContext);

  useEffect(() => {
    if (jurisdiction && !SubGroup) {
      console.log(jurisdiction);
      fetchStatutesbyGroup(jurisdiction);
      setSearch("");
    }

    if (jurisdiction && SubGroup) {
      console.log(SubGroup);
      fetchStatutesbySubGroupType(SubGroup);
      setSearch("");
    }

    if (jurisdiction != "prisec" && SubGroup) {
      console.log(jurisdiction);
      console.log(SubGroup);

      fetchStatutesbySubGroup(jurisdiction, SubGroup);

      setSearch("");
    }
    if (selectedType) {
      fetchAllStatutes(selectedType);
    }
  }, [selectedType]);
  useEffect(() => {
    setTitles(
      statutesDropdown?.map((item) => ({ label: item.title, id: item.id }))
    );
    console.log(titleslist);
  }, [statutesDropdown]);

  useEffect(() => {
    console.log(statutes);
    setPaginatedStatutes(
      filteredStatutes.length > 0
        ? filteredStatutes.slice(0, 10)
        : statutes.slice(0, 10)
    );
  }, [statutes]);

  useEffect(() => {
    if (selectedStatute) fetchStatuteSections();
  }, [selectedStatute]);

  useEffect(() => {
    if (sectionDisplay) console.log(sectionDisplay);

    setSectionsDisplay(
      sections?.map((item) => ({
        label: item.title,
        id: item.id,
        cases: item.cases,
      }))
    );
  }, [sections]);

  useEffect(() => {
    if (sectionId && selectedStatute) fetchCasebyStatueandSection();
  }, [sectionId]);

  const [paginatedStatutes, setPaginatedStatutes] = useState(
    filteredStatutes?.length > 0
      ? filteredStatutes?.slice(0, 10)
      : statutes?.slice(0, 10)
  );
  const paginationHandler = (e, v) => {
    filteredStatutes.length > 0
      ? setPaginatedStatutes(filteredStatutes?.slice((v - 1) * 10, v * 10))
      : setPaginatedStatutes(statutes?.slice((v - 1) * 10, v * 10));
  };
  const statuteSearchHandler = async () => {
    if (jurisdiction) {
      console.log(jurisdiction);
      console.log(search);
      const filtered = statutes.filter((statute) =>
        statute.title
          ? statute.title.toLowerCase().includes(search.toLowerCase())
          : false
      );
      setPaginatedStatutes(filtered.slice(0, 10));
      setFilteredStatutes(filtered);
    } else {
      console.log(search);
      await fetchStatutesByTitleorYear(search);
    }
    setSearch("");
  };
  const cardClickHandler = (item) => {
    console.log(item);
    navigation("/judgment", {
      state: { data: item._id?.$oid || item?._id || item?.id },
    });
  };

  return (
    <>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            color: Colors.secondary,
          }}
        >
          Statutes Search
        </Typography>
        <SearchContainer>
          <SearchBar
            value={search}
            label="Enter Title or Year"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton onClick={statuteSearchHandler}>Search</SearchButton>
        </SearchContainer>
        <SearchDivider />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            color: Colors.secondary,
          }}
        >
          Case Law by Section
        </Typography>
        {jurisdiction && (
          <>
            <FormControl
              sx={{
                m: 3,
                minWidth: 600,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Statute Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedType}
                label="Statute Type"
                onChange={(e) => {
                  setSelectedType(e.target.value);
                }}
              >
                <MenuItem value="primary" key="1">
                  Primary
                </MenuItem>
                <MenuItem value="secondary" key="2">
                  Secondary
                </MenuItem>
                <MenuItem value="bills" key="3">
                  Bills
                </MenuItem>
                <MenuItem value="amendment" key="4">
                  Amendments
                </MenuItem>

                {/* { departments.map ( ( department ) => (
                                    <MenuItem value={ department._id }
                                              key={ department._id }>{ department.DeptName }</MenuItem>
                                ) ) } */}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                m: 3,
                minWidth: 500,
              }}
            >
              <Autocomplete
                id="combo-box-demo"
                options={titleslist}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  console.log(value.id);
                  setSelectedStatuteID(value?.id);
                }}
                renderInput={(params) => {
                  return <TextField {...params} label="Statutes....." />;
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                m: 3,
                minWidth: 500,
              }}
            >
              <Autocomplete
                id="combo-box-demo"
                options={sectionDisplay}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  console.log(value.id);
                  setSectionID(value.id);
                }}
                renderInput={(params) => {
                  return <TextField {...params} label="Sections....." />;
                }}
              />
            </FormControl>
            {/* <FormControl sx={ {
                            m : 2, minWidth : 300 ,
                        } }>
                            <InputLabel id="demo-simple-select-label">Sections</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value=""
                                label="Sections"
                                onChange={ (e)=>{ 
                                  // setSelectedType(e.target.value)
                                   }}
                            >
                                           {sections && Object.entries(sections).forEach(([ind, value]) =>  (
                                            value.map((section)=>
                                            
                                            <MenuItem value={section.title}
                                            >{section.id} {JSON.stringify(section.title}</MenuItem>
                                                                                      
                                    
                                )) )}
                                {/* {(sections !==[])? sections?.map(( section ) => (
                                    <MenuItem value={ section.title }
                                              key={ section.id }>{ section.title }</MenuItem>
                                ) ): <></> } }
                            </Select>
                            
                        </FormControl>
                        */}
            <SearchDivider />
          </>
        )}

        <ListContainer>
          <Pagination
            count={
              filteredStatutes.length > 0
                ? Math.ceil(filteredStatutes.length / 10) || 1
                : Math.ceil(statutes.length / 10) || 1
            }
            color="secondary"
            size="large"
            sx={{
              margin: "4rem auto",
            }}
            onChange={(e, v) => paginationHandler(e, v)}
          />
          {paginatedStatutes &&
            paginatedStatutes.map((statute, index) => (
              <CardContainer
                onClick={(e) =>
                  navigation("/legislation", { state: { data: statute?._id.$oid}})
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      color: Colors.secondary,
                    }}
                  >
                    {statute.title}
                  </Typography>
                  <Box>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Dated: </span>
                      {statute.date &&
                        statute.date.replace("Promulgation Date: ", "")}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Topic: </span>
                      {statute.categories[0].name}
                    </Typography>
                  </Box>
                </Box>
              </CardContainer>
            ))}
        </ListContainer>
      </Box>

      {cases &&
        cases?.map((item) => {
          return (
            <Box onClick={() => cardClickHandler(item)}>
              <CaseCard
                key={item.sql_id}
                id={item.sql_id}
                title={`${item.appeallant} vs ${item.respondant}`}
                court={item.court}
                date={item.judgment_date}
                result={item.result}
                appeal={item.appeal}
              />
            </Box>
          );
        })}
      {loading && <LoadingScreen />}
    </>
  );
};

export default Statutes;
