import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import COLORS from "../common/data/enumColors";
import Button from "../Components/bootstrap/Button";
import Card, {
  CardBody,
  CardFooter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from "../Components/bootstrap/Card";
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "../Components/bootstrap/Dropdown";
import Input from "../Components/bootstrap/forms/Input";
import { CasesContext } from "../context/cases.context";
import Page from "../layout/Page/Page";
import PageWrapper from "../layout/PageWrapper/PageWrapper";
import SubHeader from "../layout/SubHeader/SubHeader";
import { mainMenu } from "../Components/menu";

const Statutes = () => {
  const navigation = useNavigate();
  const { jurisdiction, SubGroup } = useParams();
  const [search, setSearch] = useState("");
  const [sectionDisplay, setSectionsDisplay] = useState([]);
  const [filteredStatutes, setFilteredStatutes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [titleslist, setTitles] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const {
    // @ts-ignore
    fetchStatutesByTitleorYear,
    // @ts-ignore
    statutes,
    // @ts-ignore
    loading,
    // @ts-ignore
    fetchStatutesbyGroup,
    // @ts-ignore
    fetchStatutesbySubGroup,
    // @ts-ignore
    fetchStatutesbySubGroupType,
    // @ts-ignore
    fetchAllStatutes,
    // @ts-ignore
    statutesDropdown,
    // @ts-ignore
    sections,
    // @ts-ignore
    setSelectedStatuteID,
    // @ts-ignore
    fetchStatuteSections,
    // @ts-ignore
    selectedStatute,
    // @ts-ignore
    sectionId,
    // @ts-ignore
    setSectionID,
    // @ts-ignore
    cases,
    // @ts-ignore
    fetchCasebyStatueandSection,
    // @ts-ignore
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
      // @ts-ignore
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
      // @ts-ignore
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
  // @ts-ignore
  const paginationHandler = (e, v) => {
    filteredStatutes.length > 0
      ? setPaginatedStatutes(filteredStatutes?.slice((v - 1) * 10, v * 10))
      : setPaginatedStatutes(statutes?.slice((v - 1) * 10, v * 10));
  };
  const statuteSearchHandler = async () => {
    if (jurisdiction) {
      console.log(jurisdiction);
      console.log(search);
      // @ts-ignore
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
  // @ts-ignore
  const cardClickHandler = (item) => {
    console.log(item);
    navigation("/judgment", {
      state: { data: item._id?.$oid || item?._id || item?.id },
    });
  };

  return (
    <PageWrapper title={mainMenu.statutes.text}>
      <Page>
        <SubHeader>
          <h1>Statutes</h1>
        </SubHeader>

        <div className="row mx-auto" style={{ width: "60%" }}>
          <div style={{ marginTop: "10rem" }}></div>
          <h2 className="text-center">Statutes Search</h2>
          <div className="mt-3" />
          <div className="d-flex">
            <Input
              type="text"
              onChange={(e) => {
                // @ts-ignore
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="Enter Title or Year"
            />
            <Button
              className="d-flex align-items-center"
              color={COLORS.PRIMARY.name}
              icon="Search"
              onClick={statuteSearchHandler}
            >
              Search
            </Button>
          </div>
          <div className="border" style={{ marginTop: "5rem" }} />
          <div className="mt-5 " />
          <Card>
            <CardHeader
              size={"sm"}
              borderSize={null}
              className="justify-content-center"
            >
              <CardTitle>Case Law by Section</CardTitle>
            </CardHeader>
            <CardBody className="d-flex">
              <Dropdown direction={"down"}>
                <DropdownToggle>
                  <Button color={COLORS.PRIMARY.name} isLight icon="Public">
                    {selectedType === "" ? "Select Type" : selectedType}
                  </Button>
                </DropdownToggle>
                <DropdownMenu
                  style={{ height: "10rem" }}
                  className="overflow-auto"
                >
                  <DropdownItem onClick={(e) => setSelectedType("primary")}>
                    Primary
                  </DropdownItem>
                  <DropdownItem onClick={(e) => setSelectedType("secondary")}>
                    Secondary
                  </DropdownItem>
                  <DropdownItem onClick={(e) => setSelectedType("bills")}>
                    Bills
                  </DropdownItem>
                  <DropdownItem onClick={(e) => setSelectedType("amendment")}>
                    Amendments
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <span className="px-1" />
              <Dropdown direction={"down"}>
                <DropdownToggle>
                  <Button color={COLORS.PRIMARY.name} isLight icon="Public">
                    {selectedTitle === "" ? "Statutes..." : selectedTitle}
                  </Button>
                </DropdownToggle>
                <DropdownMenu
                  style={{ height: "10rem" }}
                  className="overflow-auto"
                >
                  {titleslist.length > 0 &&
                    titleslist.map((item) => (
                      <DropdownItem
                        // @ts-ignore
                        key={item.id}
                        onClick={() => {
                          // @ts-ignore
                          setSelectedTitle(item.label);
                          // @ts-ignore
                          setSelectedStatuteID(item.id);
                        }}
                      >
                        {
                          // @ts-ignore
                          item.label
                        }
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
              <span className="px-1" />
              <Dropdown direction={"down"}>
                <DropdownToggle>
                  <Button color={COLORS.PRIMARY.name} isLight icon="Public">
                    {selectedSection === "" ? "Sections..." : selectedSection}
                  </Button>
                </DropdownToggle>
                <DropdownMenu
                  style={{ height: "10rem" }}
                  className="overflow-auto"
                >
                  {sectionDisplay?.length > 0 &&
                    sectionDisplay.map((item) => (
                      <DropdownItem
                        // @ts-ignore
                        key={item.id}
                        onClick={() => {
                          // @ts-ignore
                          setSelectedSection(item.label);
                          // @ts-ignore
                          setSectionID(item.id);
                        }}
                      >
                        {
                          // @ts-ignore
                          item.label
                        }
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
          <div className="border" style={{ marginTop: "5rem" }} />
          <div className="mt-5 " />
          {paginatedStatutes &&
            //@ts-ignore
            paginatedStatutes.map((statute, index) => (
              <Card key={statute.id} shadow={"lg"} borderSize={1}>
                <CardHeader
                  size={"lg"}
                  borderSize={null}
                  className="flex-column align-items-center"
                >
                  <CardLabel>
                    <CardTitle>{`${statute.title}`}</CardTitle>
                  </CardLabel>
                </CardHeader>

                <CardFooter size={"lg"} borderSize={1}>
                  <CardFooterLeft>
                    Dated: <strong>{statute.date.split(":")[1]}</strong>
                  </CardFooterLeft>
                  <CardFooterRight>Topic:</CardFooterRight>
                </CardFooter>
              </Card>
            ))}
        </div>
      </Page>
    </PageWrapper>
  );
};
export default Statutes;
