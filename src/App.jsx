import React, { useState } from 'react';
import Header from './components/Header';
import Prompt from './components/Prompt';
import Selections from './components/Selections';
import Button from "./components/Button";
import Spinner from './components/Spinner';

// import useAsyncFetch from './useAsyncFetch';
// import { waitFor } from "@testing-library/dom";
// import './App.css';


// All the components include in this App component 
/* App */
function App() {

  // PageID represents the different page states of App
  const [page, setPage] = useState(0);

  // change the page contents by changing the pageID
  const loadPage = (id) => {
    setPage(id);
  } 
 
  // state hook for user selected school
  const [school, setSchool] = useState("");
  const selectSchool = (sch) => {
    setSchool(sch);
    console.log("check for the school name -- line 26 App.js")
  }

  // state hook for income selected school
  // income = 1-5
  // 1: income_level.0-30000
  // 2: income_level.30001-48000
  // 3: income_level.48001-75000
  // 4: income_level.750001-111000
  // 5: income_level.110001-plus
  const [income, setIncome] = useState();
  const selectIncome = (num) => {
    console.log("set the income -- line 34 App.js");
  
    setIncome(num);
  }


  // use to store the school info return from the sever
  // school.address e.g. "University of California-Davis,CA,Davis"
  // school.tution
  // school.fee = subtotal

  // living_cost = subtotal - tution
  const [schoolInfo, setSchoolInfo] = useState();
  const recordSchoolInfo = (school) => {
    // update the state
    setSchoolInfo(school);
  }

  // netPrice = total
  const [netPrice, setNetPrice] = useState();
  const updateNetPrice = (num) => {
    // update the net price for selected school
    setNetPrice(num);
  }

  // control the spinner when sending AJAX query to server
  const [fetchStatus, setFetchStatus] = useState(false);
  const updateFetchStatus = (onOff) => {
    setFetchStatus(onOff);
  }

  // Use to check if user made the selection before clock button
  const [selectStatus, setSelectStatus] = useState(false);
  const updateSelect = () => {
    setSelectStatus(!selectStatus);
  }

  return (
    <div className='container' style={fetchStatus ? {filter: 'blur(1px)', opacity:'60%'} : undefined }>
      <Header id={page}  />
      <Prompt id={page} schoolInfo={schoolInfo} netPrice={netPrice} />
      <Spinner fetching={fetchStatus} style={fetchStatus ? {filter: 'blur(0px)', opacity:'100%'} : undefined }/>
      <Selections id={page} school={school} setSchool={selectSchool} income={income} setIncome={selectIncome} updateSelect={updateSelect} />
      <Button id={page} load={loadPage} school={school} income={income} fetchSchoolInfo={recordSchoolInfo} updateNetPrice={updateNetPrice} schoolInfo={schoolInfo} setSpinner={updateFetchStatus} selectStaus={selectStatus} updateSelect={updateSelect}/>
    </div>
  )
}

export default App;