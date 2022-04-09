import React from 'react'
import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = ({fetching}) => {
  return (
    <div>
      { fetching && 
        <Loader className='spinner' type="ThreeDots" color="#00BFFF" secondaryColor="#94c8d6" height={80} width={80} />
      }  
    </div>
  )
}

export default Spinner