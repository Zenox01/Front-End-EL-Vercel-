import axios from "axios";
import { createContext, useState } from "react";
import useDebounce from "../hooks/useDebounce";
// @ts-ignore

type CaseContextProviderProps={
  children: React.ReactNode
}

// @ts-ignore
export const CasesContext = createContext();

// @ts-ignore
export const CasesContextProvider = ({ children }:CaseContextProviderProps) => {
  const [cases, setCases] = useState();
  const [totalCount, setTotalCount] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [statutes, setStatutes] = useState([]);
  const [statutesDropdown, setStatutesList] = useState([]);
  const [selectedStatute, setSelectedStatuteID] = useState("");
  const [sections, setSectionsList] = useState();
  const [sectionId, setSectionID] = useState();
  const [casesSideBar, setCasesSideBar] = useState([]);

  const [Clicked, setClicked] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  // @ts-ignore
  const fetchCasesByTitle = async (count, pageNo) => {
    try {
      setLoading(true);
      console.log(search);
      const URL = `${process.env.REACT_APP_API_NEST_URL}/case-search/search-by-term`;
      const response = await axios.post(URL, {
        searchTerm: debouncedSearch,
        totalCount: count,
        pageNo: pageNo,
      });
      console.log(response.data);
      setCases(response.data.data);
      setTotalCount(response.data.recordsFound.toString());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    return cases;
  };
  // @ts-ignore
  const fetchSideCardCasesList = async (identity) => {
    try {
      console.log(identity);
      const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statute-retrieval-by-id/${identity}`;
      const response = await axios.get(URL);
      console.log(response.data);
      if (response.data) {
        setCasesSideBar(
          // @ts-ignore
          response?.data.map((item) => ({
            label: `${item.appeallant}  vs  ${item.respondant}`,
            id: item.id,
          }))
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // @ts-ignore
  const fetchCaseById = async (id) => {
    try {
      setLoading(true);
      console.log("search BY ID.......");
      const URL = `${process.env.REACT_APP_API_NEST_URL}/case-search/search-by-id/${id}`;
      const response = await axios.get(URL);
      console.log("Response:");
      console.log(response.data);
      setCases(response.data);
      // setTotalCount(response.data.recordsFound.toString());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const fetchStatutebyId = async (id) => {
  //   try {
  //     setLoading(true);
  //     console.log("search BY ID.......");
  //     const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/retrieve-whole-statute-by-id/${id}`;
  //     const response = await axios.get(URL);
  //     console.log("Response:")
  //     console.log(response.data);
  //     setStatutebyId(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);

  //   }

  // };
  // @ts-ignore
  const fetchCasesByCitations = async (year, journal, page) => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/citation-search/case-by-citation/${journal}/${year}/${page}`;
    const response = await axios.get(URL);
    console.log(response);
    let data = response.data;
    console.log("data frm fetch:");
    console.log(data);
    // @ts-ignore
    data = data.filter((item) => item.judgmentId != null);
    // @ts-ignore
    data = data.map((item) => item.judgmentId);
    setCases(data);
    setLoading(false);
  };
  // const fetchStatutesByYear = async (year)=>{
  //   setLoading(true);
  //   const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statutes-by-year/${year}`;
  //   const response = await axios.get(URL);
  //   let data = await response.json();
  //   setStatutes(data);
  //   console.log(response);

  // }
  // @ts-ignore
  const fetchStatutesByTitleorYear = async (search) => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statutes-by-searchterm/`;
    const response = await axios.post(URL, { searchTerm: search, pageNo: "1" });
    console.log(response);
    let data = response?.data;

    console.log(data);
    setStatutes(data);
    setLoading(false);
  };
  // @ts-ignore
  const fetchStatutesbyGroup = async (jurisdiction) => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statutes-by-group/`;
    const response = await axios.post(URL, { groupSearchTerm: jurisdiction });
    console.log(response);
    let data = await response?.data;
    console.log(data);
    setStatutes(data);
    setLoading(false);
  };
  // @ts-ignore
  const fetchStatutesbySubGroup = async (jurisdiction, subgroup) => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statutes-by-group-subgroup/`;
    const response = await axios.post(URL, {
      groupSearchTerm: jurisdiction,
      subGroupSearchTerm: subgroup,
    });
    console.log(response);
    let data = await response?.data;
    console.log(data);
    setStatutes(data);
    setLoading(false);
  };
  // @ts-ignore
  const fetchStatutesbySubGroupType = async (type) => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statutes-by-group-subgroup-type/ `;
    const response = await axios.post(URL, { typeSearchTerm: type });
    console.log(response);
    let data = await response?.data;
    console.log(data);
    setStatutes(data);
    setLoading(false);
  };

  // const fetchStatutesProvincial = async (group, type) => {
  //   setLoading(true);
  //   const URL = `${process.env.REACT_APP_NODE_API_URL}/search/statutes/provincial/${group}/${type}`;
  //   const response = await fetch(URL, { mode: "cors" });
  //   let data = await response.json();
  //   console.log(data);
  //   setStatutes(data);
  //   setLoading(false);
  // };
  // const fetchStatutesOthers = async (type) => {
  //   setLoading(true);
  //   const URL = `${process.env.REACT_APP_NODE_API_URL}/search/statutes/others/${type}`;
  //   const response = await fetch(URL, { mode: "cors" });
  //   let data = await response.json();
  //   console.log(data);
  //   setStatutes(data);
  //   setLoading(false);
  // };
  // @ts-ignore
  const fetchAllStatutes = async (Type) => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statutes-names/${Type} `;
    const response = await axios.get(URL);

    console.log(response);
    let data = await response?.data;
    console.log(data);
    setStatutesList(data);
    setLoading(false);
  };

  const fetchStatuteSections = async () => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/statutes-search/statutes-sections/${selectedStatute} `;
    const response = await axios.get(URL);

    console.log(response);
    let data = await response?.data;
    console.log(data);
    setSectionsList(data);
    setLoading(false);
  };

  const fetchCasebyStatueandSection = async () => {
    setLoading(true);
    const URL = `${process.env.REACT_APP_API_NEST_URL}/case-search/cases-by-sections  `;
    const response = await axios.post(URL, {
      statute_id: selectedStatute,
      section_id: sectionId,
    });

    console.log(response);
    let data = await response?.data;
    console.log(data.data);
    setCases(data.data);
    setLoading(false);
  };
  /*Node APIS- NEST Pending APIs  */

  // const fetchStatutesBySections = async (section) => {
  //   setLoading(true);
  //   const URL = `${process.env.REACT_APP_NODE_API_URL}/search/statutes/sections/${section}`;
  //   const response = await fetch(URL, { mode: "cors" });
  //   let data = await response.json();
  //   console.log(data);
  //   setStatutes(data);
  //   setLoading(false);
  // }
  const value = {
    cases,
    loading,
    fetchCasesByTitle,
    fetchCasesByCitations,
    setStatutes,
    statutes,
    totalCount,
    search,
    setSearch,
    fetchStatutesByTitleorYear,
    fetchStatutesbyGroup,
    fetchStatutesbySubGroup,
    fetchStatutesbySubGroupType,
    debouncedSearch,
    Clicked,
    setClicked,
    fetchAllStatutes,
    statutesDropdown,
    sections,
    setSelectedStatuteID,
    fetchStatuteSections,
    selectedStatute,
    sectionId,
    setSectionID,
    fetchCasebyStatueandSection,
    fetchCaseById,
    fetchSideCardCasesList,
    casesSideBar,
  };

  return (
    // @ts-ignore
    <CasesContext.Provider value={value}>{children}</CasesContext.Provider>
  );
};
