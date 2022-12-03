import React, { useContext, useState } from "react";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import Page from "../../layout/Page/Page";
import { mainMenu } from "../../Components/menu";
import SubHeader from "../../layout/SubHeader/SubHeader";
import Search from "../../Components/Search";
import Button from "../../Components/bootstrap/Button";
import { CasesContext } from "../../context/cases.context";
import Input from "../../Components/bootstrap/forms/Input";

const CasesPage = () => {
  // @ts-ignore
  const { fetchCasesByCitations } = useContext(CasesContext);

  const [year, setYear] = useState("");
  const [journal, setJournal] = useState("");
  const [page, setPage] = useState("");

  const setSearchHandler = () => {
    fetchCasesByCitations(year, journal, page);
    setYear("");
    setJournal("");
    setPage("");
  };
  return (
    <PageWrapper title={mainMenu.cases.text}>
      <Page container="fluid">
        <SubHeader>
          <h1>{mainMenu.cases.text}</h1>
        </SubHeader>
        <div className="row mx-auto" style={{ width: "60%" }}>
          <div style={{ marginTop: "10rem" }}></div>
          <h2 className="text-center">Case Search</h2>
          <div className="mt-3" />
          <Search />
          <div className="border" style={{ marginTop: "5rem" }} />
          <div className="mt-5 " />
          <h2 className="text-center">Search by Citations</h2>
          <div className="mt-3" />
          <div className="d-flex justify-content-center gap-4">
            <Input
              type="number"
              onChange={(e) => {
                // @ts-ignore
                setYear(e.target.value);
              }}
              value={year}
              placeholder="Year"
            />
            <Input
              type="text"
              onChange={(e) => {
                // @ts-ignore
                setJournal(e.target.value);
              }}
              value={journal}
              placeholder="Journel"
            />
            <Input
              type="number"
              onChange={(e) => {
                // @ts-ignore
                setPage(e.target.value);
              }}
              value={page}
              placeholder="Page No"
            />
            <Button color="primary" onClick={setSearchHandler}>
              Search
            </Button>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default CasesPage;
