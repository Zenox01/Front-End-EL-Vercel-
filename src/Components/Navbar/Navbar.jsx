import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Colors } from "../../styles/theme/index";
import { NavLink } from "../../styles/Navbar/Navbar";
// import "./Navbar.css";

const Navbar = () => {
  return (
    <Box
      sx={{
        color: "#8e8e8e",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem 8rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          color: Colors.secondary,
        }}
      >
        East Law
      </Typography>
      <Box>
        <NavLink href="/cases">Cases</NavLink>
        <NavLink href="/judge/panel">Judges</NavLink>
        <NavLink href="/statutes">
          <ul className="dropdown">
            <li>
              <a href="/statutes">Statutes Type Search </a>
              <ul>
                <li>
                  <a href="/statutes/prisec/primary">Primary</a>
                </li>
                <li>
                  <a href="/statutes/prisec/secondary">Secondary</a>
                </li>
                <li>
                  <a href="/statutes/prisec/amendment">Amendmants</a>
                </li>
                <li>
                  <a href="/statutes/prisec/bills">Bills</a>
                </li>
              </ul>
            </li>
          </ul>
        </NavLink>
        <NavLink href="/statutes">
          <ul className="dropdown">
            <li>
              <a href="/statutes">Legislation</a>
              <ul>
                <li>
                  <a href="/statutes/Provincial">Provincial</a>
                  <ul>
                    <li>
                      <a href="/statutes/Provincial/Punjab">Punjab</a>
                    </li>
                    <li>
                      <a href="/statutes/Provincial/Sindh">Sindh</a>
                    </li>
                    <li>
                      <a href="/statutes/Provincial/Balochistan">Balochistan</a>
                    </li>
                    <li>
                      <a href="/statutes/Provincial/Khyber Pakhtunkhwa">
                        Khyber Pakhtunkhwa
                      </a>
                    </li>
                    <li>
                      <a href="/statutes/Provincial/Azad Jammu & Kashmir">
                        Azad Jammu & Kashmir
                      </a>
                    </li>
                    <li>
                      <a href="/statutes/Provincial/Gilgit Baltistan">
                        Gilgit Baltistan
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/statutes/Federal">Federal</a>
                </li>
                <li>
                  <a href="/statutes/Other">Other</a>
                </li>
              </ul>
            </li>
          </ul>
        </NavLink>

        <NavLink href="/department">Departments</NavLink>
      </Box>
    </Box>
  );
};

export default Navbar;
