import React, {useEffect} from 'react';

const useAsyncFetch = function (url, options, thenFun, catchFun ) {

  // the usual function that does a fetch
  async function fetchData() {
    try {
        const res = await fetch(url, options);
        if (res.status != 200) {
          throw("Server refused!")
        }
        const json = await res.json();
        console.log("Got fetch response");
        thenFun(json);
      } 
      catch (error) {
        console.log("Got fetch error");
        catchFun(error);
      }
  }

  useEffect(function () {
    console.log("Calling fetch");
    fetchData();
  }, []);

}

export default useAsyncFetch;