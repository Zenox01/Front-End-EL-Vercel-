import React, { useContext, useEffect, useState } from "react";
import { CasesContext } from "../../context/cases.context";
import { SearchContainer, SearchBar, SearchButton } from "../../styles/Cases";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { ListContainer } from "../../styles/Cases";
import CaseCard from "./CaseCard";
import { useNavigate } from "react-router-dom";

const SearchByTitle = () => {
  const {
    fetchCasesByTitle,
    setSearch,
    setClicked,
    cases,
    debouncedSearch,
    Clicked,
  } = useContext(CasesContext);
  const navigation = useNavigate();
  const cardClickHandler = (item) => {
    console.log(item);
    navigation("/judgment", {
      state: { data: item._id?.$oid || item?._id || item?.id },
    });
  };

  const searchByTitleHandler = (e) => {
    setClicked(true);
    e.preventDefault();
    const cases = fetchCasesByTitle("", "1");
    if (cases) {
      navigation("/search-result");
    }
  };

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
    setClicked(false);
  };
  useEffect(() => {
    console.log("Debounce:");
    console.log(debouncedSearch);
    async function fetchData() {
      await fetchCasesByTitle("", "1");
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);
  return (
    <>
      <SearchContainer>
        <SearchBar
          variant="outlined"
          label="Search By Title"
          onChange={inputChangeHandler}
        />

        <SearchButton variant="contained" onClick={searchByTitleHandler}>
          Search
        </SearchButton>
      </SearchContainer>

      {!Clicked && (
        <ListContainer>
          {cases.map((item) => {
            return (
              <Box onClick={() => cardClickHandler(item)}>
                <CaseCard
                  title={`${item.appeallant} vs ${item.respondant}`}
                  court={item.court}
                />
              </Box>
            );
          })}
        </ListContainer>
      )}
    </>
  );
};

export default SearchByTitle;
