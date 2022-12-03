import * as React from "react";
import { useEffect, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  NativeSelect,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingScreen from "../Cases/LoadingScreen";
import { CasesContext } from "../../context/cases.context";
import { Link } from "react-router-dom";

function Panel(props) {
  const { fetchCaseById } = useContext(CasesContext);
  const [judge, setJudge] = React.useState([]);
  const [heirarchy, setHeirarchy] = React.useState([]);
  const [heirarchies, setHeirarchies] = React.useState([]);
  const [judges, setJudges] = React.useState([]);
  const [panel, setPanel] = React.useState([]);
  const [aloneCases, setAloneCases] = React.useState([]);
  const [cases, setCases] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [Court, setCourt] = React.useState("");
  const [Courts, setCourts] = React.useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setJudge(event.target.value);
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_NEST_URL}/judge-search/judges-panels`,
        {
          judge: event.target.value,
          court: Court,
        }
      )
      .then((res) => {
        setPanel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.post ( `http://localhost:4020/get/judges/panel/cases` , {
    //     judgeId : judges.id , courtId : Courts.id
    // } ).then ( ( res ) => {
    //     // setPanel ( res.data );
    //     console.log(res.data)
    //     // setLoading ( false );
    // } ).catch ( ( err ) => {
    //     console.log ( err )
    // } )
    axios.post ( `http://localhost:3001/judge-search/stand-alone-cases` , {
        judge : event.target.value , court : Court
    } ).then ( ( res ) => {
        setAloneCases( res.data.response );
        console.log(res.data.response)
        setLoading ( false );
    } ).catch ( ( err ) => {
        console.log ( err )
    } )
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_NEST_URL}/court-search/fetch-hierarchies`,
        {}
      )
      .then((response) => {
        setHeirarchies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeHeirarchy = (event) => {
    setHeirarchy(event.target.value);
    setLoading(true);
    const value = event.target.value;
    //
    // console.log("value;");
    // console.log(value);
    axios
      .get(
        `${process.env.REACT_APP_API_NEST_URL}/court-search/courts-by-hier/${value}`
      )
      .then((response) => {
        setCourts(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // setCourts()
  };

  const handleChangeCourt = (event) => {
    const courtName = event.target.value;
    setCourt(courtName);
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_NEST_URL}/judge-search/judges-by-courts/`,
        {
          court: courtName,
        }
      )
      .then((response) => {
        setJudges(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewCases = (cases) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_NEST_URL}/judge-search/panel-cases`, {
        panel_case: cases,
      })
      .then((response) => {
        setCases(response.data);
        setLoading(false);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "midnightblue",
              }}
            >
              Judges Panel
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {/*  *************************8  Selecting Heirarchies *************************/}
            <FormControl sx={{ minWidth: 120, maxHeight: 400 }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Select Hierarchy
              </InputLabel>
              <NativeSelect
                defaultValue={""}
                value={heirarchy}
                inputProps={{
                  name: "Heirarchy",
                  id: "uncontrolled-native",
                }}
                onChange={handleChangeHeirarchy}
              >
                <option value={""}>Select Heirarchy</option>
                {heirarchies.map((heir) => (
                  <option value={heir._id}>{heir.name}</option>
                ))}
              </NativeSelect>
            </FormControl>
            <Box
              sx={{
                marginLeft: "3rem",
              }}
            >
              <FormControl sx={{ minWidth: 120, maxHeight: 400 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Select Courts
                </InputLabel>
                <NativeSelect
                  defaultValue={""}
                  value={Court}
                  inputProps={{
                    name: "Court",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleChangeCourt}
                >
                  <option value={""}>Select Courts</option>
                  {Courts.map((court) => (
                    <option value={court.name}>{court.name}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <Box
              sx={{
                marginLeft: "3rem",
              }}
            >
              <FormControl sx={{ minWidth: 120, maxHeight: 400 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Select Judges
                </InputLabel>
                <NativeSelect
                  defaultValue={""}
                  value={judge}
                  inputProps={{
                    name: "Judge",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleChange}
                >
                  <option value={""}>Select Judges</option>
                  {judges.map((judge) => (
                    <option value={judge._id}>{judge.name}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "2rem",
          }}
        >
          {aloneCases.length > 0 && (
            <>
              <Typography
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  color: "mediumvioletred",
                  textAlign: "center"
                }}
              >
                Stand Alone Cases
              </Typography>
              <Box>
                {aloneCases.map((alone) => (
                  <Paper
                    sx={{
                      display: "flex",
                      minWidth: 200,
                      maxWidth: 800,
                      boxShadow: 3,
                      cursor: "pointer",
                      marginY: "1rem",
                      padding: "1rem", 
                      "&:hover": {
                        boxShadow: 10,
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "midnightblue",
                          fontStyle: "italic",
                          fontWeight: "bold",
                          fontSize: "1.25rem",
                          textAlign: "center"
                        }}
                      >
                        {alone.appeallant} vs {alone.respondant}
                      </Typography>
                      {/* <Button
                        sx={{
                          marginLeft: ".5rem",
                          marginTop: "1rem",
                          marginBottom: ".5rem",
                          color: "white",
                          backgroundColor: "darkslategrey",
                          height: "2rem",
                          "&:hover": {
                            backgroundColor: "mediumvioletred",
                          },
                        }}
                        onClick={() => viewCases(alone.cases)}
                      >
                        View Cases
                      </Button> */}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: "mediumvioletred",
              }}
            >
              Panels
            </Typography>
          </Box>
        </Box>

        {panel
          ? Object.keys(panel).map((value, index) => (
              <>
                <Box
                  sx={{
                    marginLeft: "2rem",
                  }}
                >
                  <Paper
                    key={index}
                    sx={{
                      display: "flex",
                      minWidth: 200,
                      maxWidth: 800,
                      boxShadow: 3,
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: 10,
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        padding: ".25rem",
                      }}
                    >
                      <GroupsIcon
                        sx={{
                          marginTop: ".25rem",
                          color: "midnightblue",
                          marginRight: "1rem",
                        }}
                      />
                      {index + "   " + value + "    P.V" + panel[value][0]}
                      <Button
                        sx={{
                          marginLeft: "1rem",
                          marginTop: "1rem",
                          color: "white",
                          backgroundColor: "darkslategrey",
                          "&:hover": {
                            backgroundColor: "mediumvioletred",
                          },
                        }}
                        onClick={() => viewCases(panel[value])}
                      >
                        View Cases
                      </Button>
                    </Box>
                  </Paper>
                  <Divider
                    sx={{
                      minWidth: 200,
                      maxWidth: 800,
                      height: ".0025rem",
                      backgroundColor: "midnightblue",
                      marginBottom: ".5rem",
                    }}
                  />
                </Box>
              </>
            ))
          : loading && <LoadingScreen />}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          // fullWidth={true}
          maxWidth={"md"}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Case Details"}
          </DialogTitle>
          <>
            {cases.length > 0
              ? cases.map((caseItem, index) => (
                  <Box
                    sx={{
                      marginBottom: ".5rem",
                    }}
                  >
                    <DialogContent>
                      <DialogContentText
                        sx={{
                          color: "midnightblue",
                        }}
                      >
                        <span
                          style={{
                            color: "mediumvioletred",
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}.
                        </span>
                        {caseItem.appeal}
                        <span
                          style={{
                            color: "midnightblue",
                            fontWeight: "bold",
                            marginLeft: "1rem",
                          }}
                        >
                          Date: {caseItem.judgment_date}
                        </span>
                        <Link to="/judgment">
                          <Button
                            onClick={() => fetchCaseById(caseItem.id)}
                            variant={"contianed"}
                            sx={{
                              backgroundColor: "darkslategrey",
                              color: "white",
                              marginLeft: "1rem",
                              "&:hover": {
                                backgroundColor: "mediumvioletred",
                              },
                            }}
                          >
                            View
                          </Button>
                        </Link>
                      </DialogContentText>
                    </DialogContent>
                  </Box>
                ))
              : loading && <LoadingScreen />}
          </>
          <DialogActions></DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Panel;
