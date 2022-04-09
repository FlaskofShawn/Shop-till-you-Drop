import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import useAsyncFetch from './useAsyncFetch';

const Selections = ({id, school, setSchool, income, setIncome, updateSelect}) => {

    // schools[0]: include the array of school names
    const [schools, setSchools] = useState([]);

    // callbacks to handle after the fecth get responsed
    const thenFunc = (res) => {
      console.log("receive response from AJAX server.   -- line33 Selection.js");
      console.log(res);
      setSchools(res);
      console.log("finish update the school list -- line 36 Selection.js");
    }
    const catchFunc = (err) => {
      console.log(err);
    }

    // call the custom fetch hook, passing it the callback functions that it can use
    useAsyncFetch('api/getSchool', {}, thenFunc, catchFunc);



    // @ Credit: https://www.npmjs.com/package/react-search-autocomplete

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    // update user select school 
    const handleOnSelect = (item) => {
        // the item selected
        console.log("checking for the selected item    --- line 45 Selections.js ")
        console.log(item)

        console.log("update to the App.js")
        setSchool(item.name)
        updateSelect();
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }


    // update income value when user select
    const updateIncome = () => {
        let value = document.getElementById('incomeselect').value;

        let range = [];
        if (value == '30') {
          setIncome(1);
        } else if (value == '48') {
          setIncome(2);
        } else if (value == '75') {
          setIncome(3);
        } else if (value == '110') {
          setIncome(4);
        } else if (value == '200') {
          // famliy income more than $110,000
          setIncome(5);
        }
        updateSelect(); // TODO: Double check the place
    }

    return (
        <>
        {id === 0 && 
            <div className='searchBar'>
                <p className='textInstruct'>Start typing to pick a school</p>
                <ReactSearchAutocomplete id='selectSchool'
                    items={schools.schoolList}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    styling={ {fontFamily: 'Segoe UI'} }
                    autoFocus
                />
            </div>
        }
        {id === 1 && 
            <div>
                <p className='textInstruct'>**YOU MAY BE ELIGIBLE FOR A DISCOUNT!</p>
            </div>
        }
        {id === 2 && 
            <div className='incomeSelect'>
                <p className='textInstruct' style={{textAlign:'start', margin:'10px 0px'}}>Family Income</p>

                <select className='form-select' id='incomeselect' onChange={()=>updateIncome()}>
                    <option defaultValue='selected'>Select Income Range</option>
                    <option value="30">$0 - $30,000</option>
                    <option value="48">$30,001 - $48,000</option>
                    <option value="75">$48,001 - $75,000</option>
                    <option value="110">$75,001 - $110,000</option> 
                    <option value="200">$110,001 +</option> 
                </select>
            </div>
        }
        {id === 3 && 
            <div>
            </div>
        }

        </>
    )
}

export default Selections
