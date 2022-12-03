import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import DetailsCard from '../Components/Judgment/DetailsCard';
import Card, { CardBody, CardLabel, CardTabItem, CardTitle } from '../Components/bootstrap/Card';
import Page from '../layout/Page/Page';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import { Divider } from '@mui/material';

type TJudgement = {
  id: String,
  appeal?: String,
  appeallant?: String,
  case_summary?: String,
  citations?: any[],
  citationsId? : any[],
  clean_judgment?: String,
  court?: String,
  court_area?: String,
  createdAt?: String,
  head_notes?: String,
  hearing_date?: String,
  judges?: any[],
  judgesId?: any[],
  judgment?: String,
  judgment_date?: String,
  practce_area?: String,
  respondant?: String,
  result?: String,
  sql_id?: Number,
  statutes?: any[],
  statutesId?: any[],
  tagged_statues?: String
}

const Judgment = () => {
  const { id } = useParams();
  const [ isOpen, setIsOpen ] = useState(true);
  const [ judgementData, setJudgementData ] = useState<TJudgement>(
    {
      id: ''
    }
  );

  useEffect(() => {
    const fetchJudgementData = async () => {
      const URL = `${process.env.REACT_APP_API_NEST_URL}/case-search/search-by-id/${id}`;
      const response = await axios.get(URL)
      setJudgementData(response.data)
    } 
    fetchJudgementData()
  }, [])

	return (
    <>
		<PageWrapper title={"Judgment"}>
			<Page container='fluid'>
        <div className='w-100'>
          <div className="row">

            {/* Judgement Dispaly */}
            <div className='col-8'>
              <Card hasTab className='d-flex overflow-auto'>
                <CardTabItem id='judgement' title='Judgement'>
                  <Card>
                    <CardLabel>
                      <CardTitle className='p-5'>
                        { judgementData?.appeal }
                      </CardTitle>
                    </CardLabel>
                    <CardBody>
                      <div dangerouslySetInnerHTML={{__html: judgementData?.judgment as string}}></div>
                    </CardBody>
                  </Card>
                </CardTabItem>
                <CardTabItem id='pdf' title='Original PDF'>
                  <Card>
                    Hello
                  </Card>
                </CardTabItem>
                <CardTabItem id='ref' title='Subsequent Reference'>
                  <Card>
                    Hello
                  </Card>
                </CardTabItem>
              </Card>
            </div>

            {/* Side Pane */}
            <div className="col-4">          
              <Card >

                <div className='row mb-5'>
                  <div className='col'>
                    <div className='d-flex align-items-center'>
                      <div className='h5 mt-5 mx-auto mb-0 text-muted' style={{ fontSize: "20px" }}>
                        <strong>Judgement</strong> Details
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Side Pane ~ Details Card */}
                <div
                  className={classNames('rounded-3 mx-4', {
                    'shadow-3d-dark': true,
                    'bg-l10-dark': true,
                  })}>
                  <div className='row row-cols-3 g-3 pb-3 px-3 mt-0'>
                    <DetailsCard detailsKey="Cited By" detailsValue={4} />
                    <DetailsCard detailsKey="Cited In" detailsValue={3} />
                    <DetailsCard detailsKey="CORAM" detailsValue={judgementData.judgesId?.length as Number} />           
                  </div>
                </div>

                {/* Side Pane ~ Judgement Linkings */}

                <Card hasTab className='d-flex overflow-auto mx-3'>
                  <CardTabItem id='statutes' title='Statutes' icon="LocalOffer">
                    <Card>
                      <CardBody>
                        {
                          judgementData &&
                          judgementData.statutesId?.map(
                            (statute, index) => (
                              <div className='cursor-pointer'>
                                <p>{ statute.title }</p>
                                <Divider sx={{ marginBottom: "5px", borderColor: "black", background: "black" }}/>
                              </div>
                            )
                          )
                        }
                      </CardBody>
                    </Card>
                  </CardTabItem>
                  <CardTabItem id='judges' title='Judges' icon="Gavel">
                    <Card>
                      <CardBody>
                          {
                            judgementData &&
                            judgementData.judgesId?.map(
                              (judge) => (
                                <div className='cursor-pointer'>
                                  <p>{ judge.name }</p>
                                  <Divider sx={{ marginBottom: "5px", borderColor: "black", background: "black" }}/>
                                </div>
                              )
                            )
                          }
                      </CardBody>
                    </Card>
                  </CardTabItem>
                  <CardTabItem id='citations' title='Citations' icon="LibraryBooks">
                    <Card>
                      <CardBody>
                              {
                                judgementData &&
                                judgementData.citationsId?.map(
                                  (citation) => (
                                    <div className='cursor-pointer'>
                                      <p>{ citation.citation }</p>
                                      <Divider sx={{ marginBottom: "5px", borderColor: "black", background: "black" }}/>
                                    </div>
                                  )
                                )
                              }
                      </CardBody>
                    </Card>
                  </CardTabItem>
                </Card>

              </Card>
            </div>
          </div>    
        </div>
			</Page>
		</PageWrapper>
    </>
	);
};

export default Judgment;
