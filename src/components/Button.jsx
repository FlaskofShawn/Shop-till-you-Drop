import React, { useState } from 'react'
import useAsyncFetch from './useAsyncFetch';

const Button = ({id, load, school, income, fetchSchoolInfo, updateNetPrice, schoolInfo, setSpinner, selectStaus, updateSelect}) => {

    // handle the reaction after click the "ADD TO CART"
    const handleAddCartClick = () => {
      // check user selection
      if (!selectStaus) {
        alert("Please Select a school!");
        return;
      }


      setSpinner(true);
      // console.log("Button pressed -- line 8 Button.js");

      // fire the fecth request from App.js
      // console.log("Send the request for school: ", school);
      const url = `/api/getInfor/?school=${school}`;

      fetch(url, {})
      .then(res => {
        if (res.status != 200) {
          console.log("Invalid request. Line 16  Button.js");
          return;
        }
        // console.log(res);
        return res.json()})
      .then(json => {
        console.log("check the json file -- line 16 Button.js")
        console.log(json);

        // validate the receiving data
        json.tuition = json.tuition == null ? 0 : json.tuition;
        json.fee = json.fee == null ? json.tuition : json.fee;
        console.log(`Check the fee: ${json.fee}`)
        console.log(`Check the tution: ${json.tuition}`)

        fetchSchoolInfo(json);

        setSpinner(false);
        // transit to next page
        load(1);
        updateSelect();
      })
      .catch(err => console.log(err));


    }


    // handle the reaction after click GO
    const handleGoBtn = () => {
      // check user selection
      if (!selectStaus) {
        alert("Please Select income level!");
        return;
      }


      setSpinner(true);

      // fetch the GET request to get discount
      // need income level and school name
      // console.log("Button pressed -- line 33 Button.js");

      // fire the fecth request from App.js
      console.log("Send the request for school: ", school);
      console.log("Send the request with income: ", income)
      const url = `/api/getDiscount/?school=${school}&income=${income}`;

      fetch(url, {})
      .then(res => {
        if (res.status != 200) {
          console.log("Invalid request. Line 51  Button.js");
          return;
        }
        return res.json()})
      .then(json => {
        console.log("check the json file -- line 56 Button.js")
        console.log(json);

        //Update the netPrice
        updateNetPrice(json.netPrice == null ? schoolInfo.fee : json.netPrice);
        
        setSpinner(false);
        // transit to the last page
        load(3);
        updateSelect();
      })
      .catch(err => console.log(err));
    }


    return (
      <>
      {id === 0 && 
        // select school page 
        <div>
          <button className='btn' style={{background:' #eda04b'}} onClick={handleAddCartClick} >ADD TO CART</button>
          
        </div>
      }
      {id === 1 && 
        <div>
          <button className='btn' style={{background: '#51b667'}} onClick={() => load(2)} >SHOP FOR DISCOUNTS</button>
        </div>
      }
      {id === 2 && 
        // select income Range
        <div>
          <button className='btn' style={{background: '#51b667'}} onClick={handleGoBtn} >GO</button>
         
        </div>
      }
      {id === 3 && 
        <div>
            <button className='btn' style={{background: '#eda04b'}} onClick={() => load(0)} >START OVER</button>
        </div>
      }
      </>        
    )
}

export default Button
