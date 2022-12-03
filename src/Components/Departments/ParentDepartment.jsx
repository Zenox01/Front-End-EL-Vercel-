import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import ToastBox from "../../utils/common/ToastBox";
import FileCard from "./FileCard";

function ParentDepartment(props) {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState([]);
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchSubDepartment, setSearchSubDepartment] = useState("");
  const [subDepartments, setSubDepartments] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const [Year, setYear] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const [No, setNo] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_NEST_URL}/department-search/department-parents`
      )
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setDepartment(event.target.value);
    navigate(`/department/${event.target.value}`);
  };

  const handleSelect = (event) => {
    setSearchDepartment(event.target.value);
    axios
      .get(
        `${process.env.REACT_APP_API_NEST_URL}/department-search/department-children/${event.target.value}`
      )
      .then((res) => {
        setSubDepartments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubSelect = (event) => {
    setSearchSubDepartment(event.target.value);
  };

  const handleSearch = () => {
    if (searchDepartment === "" || Year === "") {
      toast.error("Please fill all the fields");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_NEST_URL}/department-search/search-by-year-for-files`, {
          parentDepartment: searchDepartment,
          childDepartment: searchSubDepartment,
          year: Year,
          no: No,
        })
        .then((res) => {
          if (res.data.length === 0) {
            toast.error("No data found");
          } else {
            toast("Data found");
            setSearchResult(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
          toast("Some Error Occurred");
        });
    }
  };

  const handleTitleSearch = () => {
    if (searchTitle === "") {
      toast.error("Please Enter the text to search");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/departments/search/title`, {
          title: searchTitle,
        })
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            toast.error("No data found");
          } else {
            console.log(res.data);
            toast("Search found");
            setSearchResult(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
          toast("Some Error Occurred");
        });
    }
  };

  const handleDateSearch = () => {
    if (searchDate === "") {
      toast.error("Please Enter the text to search");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/departments/search/date`, {
          date: searchDate,
        })
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            toast.error("No data found");
          } else {
            console.log(res.data);
            toast("Search found");
            setSearchResult(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
          toast("Some Error Occurred");
        });
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastBox />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "3rem",
            }}
          >
            <Typography
              variant="h4"
              fontFamily={"Roboto"}
              sx={{ color: "mediumvioletred" }}
            >
              {" "}
              Departments{" "}
            </Typography>

            {departments ? (
              <FormControl
                sx={{
                  m: 3,
                  minWidth: 200,
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Departments
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={department}
                  label="Departments"
                  onChange={handleChange}
                >
                  {departments.map((department) => (
                    <MenuItem value={department.id} key={department.id}>
                      {department.DeptName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <Divider
              sx={{
                width: "42rem",
                color: "darkgrey",
              }}
            />
          </Box>
          <Typography
            variant={"h3"}
            fontFamily={"Robot"}
            color={"mediumvioletred"}
          >
            Search here!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              margin: "1rem",
            }}
          >
            <FormControl
              sx={{
                minWidth: 230,
              }}
            >
              <InputLabel id="demo-simple-select-label">Departments</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchDepartment}
                label="Age"
                onChange={handleSelect}
              >
                {departments.map((department) => (
                  <MenuItem value={department.id} key={department.id}>
                    {department.DeptName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                m: 3,
                minWidth: 230,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Sub-Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchSubDepartment}
                label="Sub-Department"
                onChange={handleSubSelect}
              >
                <MenuItem value={""}>Select Sub-Department</MenuItem>
                {subDepartments.map((department) => (
                  <MenuItem value={department.id} key={department.id}>
                    {department.DeptName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              views={["year"]}
              label="Year"
              value={date}
              onChange={(newValue) => {
                if (
                  newValue.$y < 1954 ||
                  newValue.$y > new Date().getFullYear()
                ) {
                  toast("Please Select Appropriate Year", {
                    autoClose: 2000,
                  });
                } else {
                  setDate(newValue);
                  setYear(newValue.$y);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
            <TextField
              id="No"
              label="Enter No"
              variant="outlined"
              type={"Text"}
              onChange={(e) => {
                setNo(e.target.value);
              }}
            />

            <Button
              variant="contained"
              sx={{
                marginLeft: "2rem",
                marginRight: "2rem",
                backgroundColor: "mediumvioletred",
                width: "10rem",
              }}
              onClick={handleSearch}
            >
              {" "}
              Search{" "}
            </Button>
          </Box>
          <Divider
            sx={{
              width: "42rem",
              height: ".5rem",
              color: "violet",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Typography
                variant={"h5"}
                fontFamily={"Robot"}
                color={"mediumvioletred"}
                sx={{ margin: "1rem" }}
              >
                Search By Title
              </Typography>
              <TextField
                id="searchTitle"
                label="Search By Title"
                variant="outlined"
                type={"Text"}
                sx={{ width: "22rem" }}
                onChange={(e) => {
                  console.log("search value");
                  setSearchTitle(e.target.value);
                }}
              />
              <Button
                variant="contained"
                sx={{
                  marginTop: "2rem",
                  backgroundColor: "mediumvioletred",
                  width: "10rem",
                }}
                onClick={handleTitleSearch}
              >
                {" "}
                Search{" "}
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Typography
                variant={"h5"}
                fontFamily={"Robot"}
                color={"mediumvioletred"}
                sx={{ margin: "1rem" }}
              >
                Search By Date
              </Typography>
              <TextField
                id="searchDate"
                label="Search By Date"
                variant="outlined"
                type={"Text"}
                sx={{ width: "22rem" }}
                onChange={(e) => {
                  setSearchDate(e.target.value);
                }}
              />
              <Button
                variant="contained"
                sx={{
                  marginTop: "2rem",
                  backgroundColor: "mediumvioletred",
                  width: "10rem",
                }}
                onClick={handleDateSearch}
              >
                {" "}
                Search{" "}
              </Button>
            </Box>
          </Box>
          {
            searchResult && 
            searchResult.map(file => <FileCard files={file} />)
        }
        </Box>
      </LocalizationProvider>
    </>
  );
}

export default ParentDepartment;
