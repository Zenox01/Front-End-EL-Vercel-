import axios from "axios";
import React, { useContext, useEffect } from "react";
import COLORS from "../common/data/enumColors";
import Button from "../Components/bootstrap/Button";
import Card, {
  CardBody,
  CardHeader,
  CardTitle,
} from "../Components/bootstrap/Card";
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "../Components/bootstrap/Dropdown";
import { CasesContext } from "../context/cases.context";
import Page from "../layout/Page/Page";
import PageWrapper from "../layout/PageWrapper/PageWrapper";
import SubHeader from "../layout/SubHeader/SubHeader";
import { mainMenu } from "../Components/menu";

const Judges = () => {
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
  return (
    <PageWrapper title={mainMenu.judges.text}>
      <Page container="fluid">
        <SubHeader>
          <h3> Judges Panel</h3>
        </SubHeader>
        <div style={{ marginTop: "5rem" }} />
        <Card className="mx-auto d-flex justify-content-center gap-3">
          <CardHeader size={"sm"} borderSize={null}>
            <CardTitle>Judge Filter</CardTitle>
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
                {heirarchies.map((heirarchy, index) => (
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
                {Courts.map((court, index) => (
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
        <div className="row">
          <h1 className="text-center">Panel</h1>
          <div className="col-xl-4">
            <div className="mt-2" />
            {Object.keys(panel).length > 0 &&
              Object.keys(panel).map((judge, index) => (
                <Card key={index}>
                  <CardTitle>
                    <h3>
                      {
                        // @ts-ignore
                        judge
                      }
                    </h3>
                  </CardTitle>
                </Card>
              ))}
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};
export default Judges;
