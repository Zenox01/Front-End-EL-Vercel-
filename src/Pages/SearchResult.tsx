import React, { useContext, useEffect } from "react";
import PageWrapper from "../layout/PageWrapper/PageWrapper";
import Page from "../layout/Page/Page";
import { search } from "../Components/menu";
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "../Components/bootstrap/Dropdown";
import Button from "../Components/bootstrap/Button";
import COLORS from "../common/data/enumColors";
import SubHeader from "../layout/SubHeader/SubHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import Card, {
  CardBody,
  CardFooter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTabItem,
  CardTitle,
} from "../Components/bootstrap/Card";
import parse from "html-react-parser";
import { CasesContext } from "../context/cases.context";
const SearchResult = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const { cases, totalCount, fetchCasesByTitle, Clicked } =
  useContext(CasesContext);
  const [judge, setJudge] = React.useState("");
  const [heirarchy, setHeirarchy] = React.useState("");
  const [heirarchies, setHeirarchies] = React.useState([]);
  const [judges, setJudges] = React.useState([]);
  const [panel, setPanel] = React.useState([]);
  // const [cases, setCases] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [Court, setCourt] = React.useState("");
  const [Courts, setCourts] = React.useState([]);
  const [caseType, setCaseType] = React.useState("");
  const [timeLine, setTimeLine] = React.useState("");
  
  // @ts-ignore
  const paginationHandler = (e, v) => {
    fetchCasesByTitle(totalCount, v.toString());
  };
  // @ts-ignore
  const handleChange = (event, index) => {
    // @ts-ignore
    setJudge(judges[index].name);
    setLoading(true);
    axios
    .post(
      `${process.env.REACT_APP_API_NEST_URL}/judge-search/judges-panels`,
      {
        // @ts-ignore
        judge: judges[index].name,
        court: Court,
      }
      )
      .then((res) => {
        setPanel(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_NEST_URL}/court-search/fetch-hierarchies`,
        {}
      )
      .then((response) => {
        // @ts-ignore
        setHeirarchies([...response.data]);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // @ts-ignore
  const handleChangeHeirarchy = (e, index) => {
    // @ts-ignore
    const value = heirarchies[index].name;
    setHeirarchy(value);
    setLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_API_NEST_URL}/court-search/courts-by-hier/${value}`
      )
      .then((response) => {
        console.log(response.data);
        //  @ts-ignore
        setCourts([...response.data]);

        console.log("Courts:");
        console.log(Courts);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // setCourts()
  };

  // @ts-ignore
  const handleChangeCourt = (event, index) => {
    // @ts-ignore
    const courtName = Courts[index].name;
    setCourt(courtName);
    setLoading(true);
    console.log(courtName);
    axios
      .post(
        `${process.env.REACT_APP_API_NEST_URL}/judge-search/judges-by-courts/`,
        {
          court: courtName,
        }
      )
      .then((response) => {
        // @ts-ignore
        setJudges([...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onJudgmentClickHandler = (id: String) => {
    navigate(`/judgement/${id}`);
  }

  return (
    <PageWrapper title={search.searchResult.text}>
      <Page container="fluid">
        <SubHeader>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Card>
              <CardHeader
                size={"sm"}
                borderSize={null}
                className="justify-content-center"
              >
                <CardTitle className="text-center">Practice Areas</CardTitle>
              </CardHeader>
              <CardBody className="d-flex">
                <Dropdown direction={"down"}>
                  <DropdownToggle>
                    <Button color={COLORS.PRIMARY.name} isLight icon="Public">
                      {caseType === "" ? "Select Cases Type" : caseType}
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ height: "10rem" }}
                    className="overflow-auto"
                  >
                    <DropdownItem
                      onClick={() => setCaseType("Indirect Tax Cases")}
                    >
                      Indirect Tax Cases
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setCaseType("Direct Tax Cases")}
                    >
                      Direct Tax Cases
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setCaseType("Intellectual Property Cases")}
                    >
                      Intellectual Property Cases
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setCaseType("All Practice Area Cases")}
                    >
                      All Practice Area Cases
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardBody>
            </Card>
            <Card>
              <CardHeader
                size={"sm"}
                borderSize={null}
                className="justify-content-center"
              >
                <CardTitle>Judge & Court Filter</CardTitle>
              </CardHeader>
              <CardBody className="d-flex">
                <Dropdown direction={"down"}>
                  <DropdownToggle>
                    <Button color={COLORS.PRIMARY.name} isLight icon="Public">
                      {heirarchy === "" ? "Select Hierarchy" : heirarchy}
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ height: "10rem" }}
                    className="overflow-auto"
                  >
                    {heirarchies && heirarchies.map((heirarchy, index) => (
                      <DropdownItem
                        key={`${heirarchy}${index}`}
                        // @ts-ignore
                        onClick={(e) => handleChangeHeirarchy(e, index)}
                      >
                        {
                          // @ts-ignore
                          heirarchy.name
                        }
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <span className="px-1" />
                <Dropdown direction={"down"} isButtonGroup={false}>
                  <DropdownToggle>
                    <Button color={COLORS.SECONDARY.name} isLight icon="Public">
                      {Court === "" ? "Select Court" : Court}
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ height: "10rem" }}
                    className="overflow-auto"
                  >
                    {Courts && Courts.map((court, index) => (
                      <DropdownItem
                        key={`${court}${index}`}
                        // @ts-ignore
                        onClick={(e) => handleChangeCourt(e, index)}
                      >
                        {
                          // @ts-ignore
                          court.name
                        }
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <span className="px-1" />
                <Dropdown direction={"down"} isButtonGroup={false}>
                  <DropdownToggle>
                    <Button color={COLORS.SUCCESS.name} isLight icon="Public">
                      {judge === "" ? "Select Judge" : judge}
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ height: "10rem" }}
                    className="overflow-auto"
                  >
                    {judges.map((judge, index) => (
                      <DropdownItem
                        key={`${judge}${index}`}
                        // @ts-ignore
                        onClick={(e) => handleChange(e, index)}
                      >
                        {
                          // @ts-ignore
                          judge.name
                        }
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </CardBody>
            </Card>
            <Card>
              <CardHeader
                size={"sm"}
                borderSize={null}
                className="justify-content-center"
              >
                <CardTitle className="text-center">TimeLine</CardTitle>
              </CardHeader>
              <CardBody className="d-flex">
                <Dropdown direction={"down"}>
                  <DropdownToggle>
                    <Button color={COLORS.PRIMARY.name} isLight icon="Public">
                      {timeLine === ""
                        ? "Select TimeLine"
                        : timeLine.split("_").join(" ")}
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ height: "10rem" }}
                    className="overflow-auto"
                  >
                    <DropdownItem
                      onClick={() => setTimeLine("From_2010_to_2020")}
                    >
                      From 2010 to 2020
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setTimeLine("From_2000_to_2010")}
                    >
                      From 2000 to 2010
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setTimeLine("From_1990_to_2000")}
                    >
                      From 1990 to 2000
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setTimeLine("From_1980_to_1990")}
                    >
                      From 1980 to 1990
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setTimeLine("From_1970_to_1980")}
                    >
                      From 1970 to 1980
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setTimeLine("From_1960_to_1970")}
                    >
                      From 1960 to 1970
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setTimeLine("From_1950_to_1960")}
                    >
                      From 1950 to 1960
                    </DropdownItem>
                    <DropdownItem onClick={() => setTimeLine("Before_1950")}>
                      Before 1950
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardBody>
            </Card>
          </div>
        </SubHeader>
        <div className="row mt-4">
          <div className="col-xl-4">
            <Card hasTab style={{ height: "200rem" }} className="overflow-auto">
              <CardTabItem id="imp_text" title="Important Text">
                { cases && 
                  // @ts-ignore
                  cases.map((caseItem, index) => (
                    <Card key={index} shadow={"lg"} borderSize={1}>
                      <CardHeader
                        size={"lg"}
                        borderSize={null}
                        className="flex-column align-items-start"
                      >
                        <CardLabel>
                          <CardTitle>
                            {`${caseItem.appeallant} vs ${caseItem.respondant}`}
                          </CardTitle>
                          <CardSubTitle>{`${caseItem.appeal}`}</CardSubTitle>
                        </CardLabel>
                        <div className="mt-1">
                          <strong>Cited by:</strong>
                          <span className="px-2" />
                          <strong>Coram:</strong>
                        </div>
                      </CardHeader>

                      <CardBody
                        className="overflow-auto"
                        style={{ height: "10rem" }}
                      >
                        {
                        `${
                            (caseItem.case_summary && 
                              caseItem.case_summary
                              .slice(0, 1450)
                              .replace(/<\/?[^>]+(>|$)/g, "")) || 
                          
                            caseItem.judgment
                              .slice(0, 1450)
                              .replace(/<\/?[^>]+(>|$)/g, "")                       
                          }` 
                        }
                        <h2 className="d-inline">...</h2>
                      </CardBody>

                      <CardFooter size={"lg"} borderSize={1}>
                        <CardFooterLeft>
                          Dated:{" "}
                          <strong>
                            {parse(`${caseItem.judgment_date}</p>`)}
                          </strong>
                        </CardFooterLeft>
                        <CardFooterRight>
                          Court: <strong>{caseItem.court}</strong>
                        </CardFooterRight>
                      </CardFooter>
                    </Card>
                  ))
                }
              </CardTabItem>
            </Card>
          </div>
          <div className="col-xl-8">
            <Card hasTab style={{ height: "200rem" }} className="overflow-auto">
              <CardTabItem id="judgments" title="Judgments">
                { cases && 
                  // @ts-ignore
                  cases.map((caseItem, index) => (
                    <Card key={index} shadow={"lg"} borderSize={1} onClick={() => onJudgmentClickHandler(caseItem._id.$oid)}>
                      <CardHeader
                        size={"lg"}
                        borderSize={null}
                        className="flex-column align-items-start"
                      >
                        <CardLabel>
                          <CardTitle className="bg-transparent">
                            {`${caseItem.appeallant} vs ${caseItem.respondant}`}
                          </CardTitle>
                          <CardSubTitle>{`${caseItem.appeal}`}</CardSubTitle>
                        </CardLabel>
                        <div className="mt-1">
                          <strong>Cited by:</strong>
                          <span className="px-2" />
                          <strong>Coram:</strong>
                        </div>
                      </CardHeader>

                      <CardBody
                        className="overflow-auto"
                        style={{ height: "10rem" }}
                      >
                        {`${caseItem.judgment
                          .slice(0, 1450)
                          .replace(/<\/?[^>]+(>|$)/g, "")}`}
                        <h2 className="d-inline">...</h2>
                      </CardBody>

                      <CardFooter size={"lg"} borderSize={1}>
                        <CardFooterLeft>
                          Dated:{" "}
                          <strong>
                            {parse(`${caseItem.judgment_date}</p>`)}
                          </strong>
                        </CardFooterLeft>
                        <CardFooterRight>
                          Court: <strong>{caseItem.court}</strong>
                        </CardFooterRight>
                      </CardFooter>
                    </Card>
                  ))
                }
              </CardTabItem>
              <CardTabItem id="statutes" title="Statutes">
                <div />
              </CardTabItem>
              <CardTabItem id="departments" title="Departments">
                <div />
              </CardTabItem>
            </Card>
          </div>
          <Pagination
            count={Math.ceil(totalCount / 10) || 1}
            color="secondary"
            size="large"
            onChange={(e, v) => paginationHandler(e, v)}
          />
        </div>
      </Page>
    </PageWrapper>
  );
};

export default SearchResult;
