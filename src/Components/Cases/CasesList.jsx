import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListContainer } from "../../styles/Cases";
import { Box, Pagination } from "@mui/material";
import { CasesContext } from "../../context/cases.context";
import CaseCard from "./CaseCard";

const CasesList = () => {
  const navigation = useNavigate()
  const cardClickHandler = (item) => {
    console.log(item);
    navigation('/judgment', { state: { data: item._id?.$oid || item?._id || item?.id }})
  }
  const { cases, totalCount, fetchCasesByTitle, Clicked } = useContext(CasesContext)
  console.log('cases: ', cases);
  const paginationHandler = (e, v) => {
    fetchCasesByTitle(totalCount, v.toString())
  }
  return (
    <>
   {Clicked &&
    <ListContainer>
      <Pagination count={Math.ceil(totalCount/10) || 1} color="secondary" size="large" sx={{
      margin: '4rem auto',
    }} onChange={(e, v) => paginationHandler(e, v)}/>
      {
        cases && cases.map((item) => {
          return (<Box onClick={() => cardClickHandler(item)}>
            <CaseCard
            key={item.sql_id}
            id={item.sql_id}
            title={`${item.appeallant} vs ${item.respondant}`}
            court={item.court}
            date={item.judgment_date}
            result={item.result}
            appeal={item.appeal}
          />
          </Box>)
        })
      }
    </ListContainer>}
    </>
  );
};

export default CasesList;
