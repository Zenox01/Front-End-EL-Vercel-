import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Colors } from "../../../styles/theme";
import InfoCard from "../../../Components/Judgment/InfoCard";
// import CustomInfoCard from "../Statutes/CasetoStatuteCard.jsx";
import axios from "axios";
import { CasesContext } from "../../../context/cases.context";
import Page from "../../../layout/Page/Page";
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import { mainMenu } from "../../../Components/menu";

const Judgment =()=>{
  const { cases  } = useContext<any>(CasesContext);
  const { state } = useLocation();
  const [data, setData] = useState<any>();

  console.log(state?.data);
  useEffect(() => {
    if (state?.data) {
      const getCaseData = async () => {
        const caseData = await axios.get(
          `http://localhost:3001/case-search/search-by-id/${state.data}`
        );
        setData(caseData.data);
      };
      getCaseData();
    } else {
      setData(cases);
      console.log(cases);
    }
  }, [cases]);
  // const hyperlinking = (text) => {
  //   const data = text.match(
  //     /\b((PLD|CLC|AIR|NLR|SCMR)(.{1,20})[^\S\r\n]?\d{1,4})\b|\b(\d{4}(.{1,20})\d{1,4})\b/g
  //   );
  //   data.map((citation) => {
  //     const journal = citation.match(/PLD|CLC|AIR|NLR|SCMR/g);
  //     const numbers = citation.match(/\b\d{1,4}\b/g);
  //     const year = numbers[0];
  //     const page = numbers[1];
  //     if (journal && year && page) {
  //       // Search From Mongo

  //       text = text.replace(
  //         citation,
  //         `<a href='http://localhost:4020/hyper-linking/${journal[0]}/${year}/${page}'>${citation}</a>`
  //       );
  //     }
  //   });
  //   return text;
  // };
  return (
    data && (
    <PageWrapper>
    <Page container="fluid">
    
      <>
        <Typography
          sx={{
            fontSize: "2.5rem",
            textAlign: "center",
            color: Colors.secondary,
            marginTop: "2rem",
          }}
        >
          {`${data?.appeallant} vs ${data?.respondant}` || "NONE"}
        </Typography>
        <Box
          sx={{
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          <Typography>
            <span style={{ fontWeight: "bold" }}>Dated: </span>
            {data?.judgment_date}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Court: </span>
            {data?.court}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Appeallant: </span>
            {data?.appeallant}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Respondant: </span>
            {data?.respondant}
          </Typography>
          <Typography width="50%" margin="auto">
            <span style={{ fontWeight: "bold" }}>Tagged Statutes: </span>
            <span
              dangerouslySetInnerHTML={{ __html: data?.tagged_statues }}
            ></span>
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Practice Area: </span>
            <span
              dangerouslySetInnerHTML={{ __html: data?.practce_area }}
            ></span>
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Reported As: </span>
            {data?.citations ? data.citations[0].citation : ""}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "5rem",
            display: "flex",
            flexDirection: "row",
            padding: "1rem",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
            }}
          >
            {/* <CustomInfoCard
              key="Statutes"
              title="Statutes"
              data={data.statutesId}
              dataId={data.statutes}
            /> */}
            <InfoCard key="Judges" title="Judges" data={data?.judgesId} />
            <InfoCard
              key="Citations"
              title="Citations"
              data={data?.citationsId}
            />
            {/* <InfoCard key="Statutes" title="Statutes" data={data.statutesId} /> */}
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <div
              // dangerouslySetInnerHTML={{ __html: hyperlinking(data.judgment) }}
              dangerouslySetInnerHTML={{ __html: data?.judgment }}
            ></div>
          </Box>
        </Box>
      </>
  
    </Page>
    </PageWrapper>
  )
  );
};

export default Judgment;
