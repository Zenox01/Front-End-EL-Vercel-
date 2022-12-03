import * as React                           from 'react';
import { useEffect }                               from 'react';
import TreeView                                    from '@mui/lab/TreeView';
import ExpandMoreIcon                              from '@mui/icons-material/ExpandMore';
import ChevronRightIcon                            from '@mui/icons-material/ChevronRight';
import TreeItem                                    from '@mui/lab/TreeItem';
import { Box , Grid , Paper , Stack , Typography } from "@mui/material";
import axios                                       from "axios";
import { Link }                                    from "react-router-dom";
import LoadingScreen                               from "../Cases/LoadingScreen";
import CaseCard                                    from "../Cases/CaseCard";
import {  }                                        from '../../context/cases.context'
import CaseView                                    from "./CaseView";

export default function UserFolderSide () {
    const [ folders , setFolders ] = React.useState ( [] );
    const [ cases , setCases ] = React.useState ( [] );
    const [ loading , setLoading ] = React.useState ( false );

    useEffect ( () => {
        console.log(process.env.REACT_APP_TEST_USER_ID)
        axios.post ( `${ process.env.REACT_APP_API_URL }/user/folders/${process.env.REACT_APP_TEST_USER_ID}` , {} )
             .then ( ( response ) => {
                 setFolders ( response.data );
             } )
             .catch ( ( error ) => {
                 console.log ( error );
             } );
    } , [] );

    const makeRequest = async ( folder ) => {
       const response = await  axios.post ( `${ process.env.REACT_APP_API_URL }/user/saved/cases` , {
            folderId : folder,
        } )
        if(response.data){
            setCases ( response.data );
        }
    };

    const handleFolderClick = async ( folder ) => {
        setLoading(true);
        await makeRequest ( folder );
        setLoading ( false );
        console.log(cases)
    };

    const showCase = (caseId) => {
        console.log(caseId)
    }

    return (
        <>
      <Grid container spacing={5}>
          <Grid item xs={3} sx={{
              marginTop:'10rem',
              marginLeft:'2rem'
          }}>
              <Paper sx={ {
                  height : 420 , flexGrow : 1 , maxWidth : 300 ,
              } }>
                  <TreeView
                      aria-label="multi-select"
                      defaultCollapseIcon={ <ExpandMoreIcon/> }
                      defaultExpandIcon={ <ChevronRightIcon/> }
                      multiSelect
                      sx={ {
                          height : 410 , flexGrow : 1 , maxWidth : 300 , overflowY : 'auto' ,
                          overflowX : 'scroll' , marginBottom : '.25rem'
                      } }
                  >
                      { folders.map ( ( folder ) => (
                          <TreeItem nodeId={ `${ folder._id }` } label={ folder.FolderName }
                                    onClick={ () => handleFolderClick ( folder._id ) } sx={{
                                        marginTop:'1rem'
                          }}>
                              { folder.subFolders.map ( ( subFolder ) => (
                                  <TreeItem nodeId={ `${ subFolder.id }` } label={ subFolder.name }
                                            onClick={ () => handleFolderClick ( subFolder._id ) } sx={{
                                                marginTop:'.5rem'
                                  }}>
                                  </TreeItem>
                              ) ) }
                          </TreeItem>
                      ) ) }
                  </TreeView>
              </Paper>
          </Grid>
          <Grid item xs={8} sx={{
              marginLeft:'3rem',
              marginTop:'6rem',
              marginBottom:'2rem',
          }}>

              <>
              { cases.map ( ( caseItem ) => (
                  <>

                      <CaseView title={caseItem.itemId?.appeal}
                                court={
                          caseItem.itemId?.court
                      }
                      date={caseItem.itemId?.judgment_date}
                        type={caseItem.itemType}
                        caseId={caseItem.itemId?._id}

                      />
                  </>
              )) }
                  {
                      cases.length === 0 && loading === false && <Typography variant={'h5'} sx={{
                            marginTop:'2rem',
                            marginLeft:'2rem'
                        }}>No Cases Saved</Typography>
                  }
                  </>
              {
               loading && (
                  <LoadingScreen/>
              ) }

          </Grid>
      </Grid>
        </>
    ); }
