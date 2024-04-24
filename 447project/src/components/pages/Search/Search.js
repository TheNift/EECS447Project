import React, { useState } from 'react';
import $ from "jquery";
import './Search.css';

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

const Search = () => {
  const [responseData, setResponseData] = useState(null);
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    const url = "https://people.eecs.ku.edu/~j618p208/App.php";
    const testData = "test=SENT DATA!!"; // Replace with your actual data

    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: testData,
      success: function(data) {
        setResponseData(data);
        useForceUpdate();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
        // Handle errors appropriately
      }
    });
  };


  return (
    <div className="search-page">
        <div className="search-title">
          <p>Search</p>
        </div>
        <div className="search-col-box">
          <div className="search-desc">
            <p>Select search parameters:</p>
          </div>
          <div className="search-button-box">
            <button variant="outlined" className="search-button-member">Upcoming</button>
            <button variant="outlined" className="search-button-member">Past</button>
            <button variant="outlined" className="search-button-member" onClick={handleClick}>All</button>
            <button variant="outlined" className="search-button-member">Specific Region</button>
          </div>
          <div>
            {responseData}
          </div>
        </div>
    </div>
  );
}

export default Search;