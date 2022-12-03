import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./icon/Icon";
import Input from "./bootstrap/forms/Input";
import { CasesContext } from "../context/cases.context";

const Search = () => {
  const refSearchInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchModalStatus, setSearchModalStatus] = useState(false);

  const {
    // @ts-ignore
    fetchCasesByTitle,
    // @ts-ignore
    search,
    // @ts-ignore
    setSearch,
    // @ts-ignore
    setClicked,
    // @ts-ignore
    cases,
    // @ts-ignore
    debouncedSearch,
    // @ts-ignore
    Clicked,
  } = useContext(CasesContext);

  // @ts-ignore
  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
    setClicked(false);
  };
  // @ts-ignore
  const cardClickHandler = (item) => {
    console.log(item);
    navigate("/judgement", {
      state: { data: item._id?.$oid || item?._id || item?.id },
    });
  };
  useEffect(() => {
    console.log("Debounce:");
    console.log(debouncedSearch);
    async function fetchData() {
      await fetchCasesByTitle("", "1");
      // if(cases){
      // setSuggest(cases.map((item) => {
      //          return [item.appeallant,item.respondant].join(" vs ");
      //                                        }   ))
      //                                       }
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <div className="position-relative">
      <div className="d-flex" data-tour="search">
        <Input
          id="searchInput"
          type="search"
          placeholder="Search..."
          onChange={inputChangeHandler}
          value={search}
          autoComplete="off"
          ref={refSearchInput}
          onFocus={() => setSearchModalStatus(true)}
          onBlur={() => setTimeout(() => setSearchModalStatus(false), 200)}
        />
        <label
          className="border-0 bg-transparent cursor-pointer"
          htmlFor="searchInput"
        >
          <Icon
            icon="Search"
            size="2x"
            color="primary"
            onClick={() => {
              if (search) navigate("/search-result");
            }}
          />
        </label>
      </div>
      {cases?.length > 0 && search?.length > 0 && searchModalStatus && (
        <div className="suggestive-search">
          {
            // @ts-ignore
            cases?.map((item) => (
              <>
                <span
                  role="button"
                  onClick={() => cardClickHandler(item)}
                >{`${item.appeallant} vs ${item.respondant}`}</span>
                <div className="border mt-2 mb-2" />
              </>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default Search;
