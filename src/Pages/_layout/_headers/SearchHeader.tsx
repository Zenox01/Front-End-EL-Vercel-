import React from "react";
import Header, { HeaderLeft, HeaderRight } from "../../../layout/Header/Header";
import Navigation from "../../../layout/Navigation/Navigation";
import { mainMenu } from "../../../Components/menu";
import useDeviceScreen from "../../../hooks/useDeviceScreen";
// import Search from "../../../Components/Search";

const SearchHeader = () => {
  const { width } = useDeviceScreen();
  return (
    <Header>
      <HeaderLeft>{/* <Search /> */}</HeaderLeft>
      <HeaderRight>
        <Navigation
          menu={{ ...mainMenu }}
          id="header-top-menu"
          horizontal={
            !!width &&
            width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
          }
        />
      </HeaderRight>
    </Header>
  );
};

export default SearchHeader;
