import React, { useState }    from 'react';
import $                      from "jquery";
// import moment                 from 'moment';
import styles                 from './search.module.css';


function useForceUpdate(){
  // eslint-disable-next-line
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

const Search = () => {
  // eslint-disable-next-line
  const [responseData, setResponseData] = useState(null);
  const forceUpdate = useForceUpdate();

  const handleClick = ( querytype ) => {
    const url = "https://people.eecs.ku.edu/~j618p208/App.php";
    const whichQuery = querytype;
    const Name = "";
    // const Date = moment().format('YYYY-MM-DD');
    const Date = "2024-03-15";
    const Location = "";
    const Region = "";
    const numPlayers = "";
    const Winner = "";
    const Ranked = "";
    

    $.ajax({
      url: url,
      type: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: { 
        whichQuery:whichQuery,
        Name:Name, Date:Date,
        Location:Location,
        Region:Region,
        numPlayers:numPlayers,
        Winner:Winner, Ranked:Ranked
      },
      success: function(data) {
        $("div.responseBox").html(data);
        setResponseData(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error:", jqXHR, textStatus, errorThrown);
        // Handle errors appropriately
      }
    });
    setTimeout(() => {
      forceUpdate();
    }, 200);
  };


  return (
    <div className={styles.searchPage}>
        <div className={styles.searchTitle}>
          <h2>Search</h2>
          <h3>Select search parameters:</h3>
        </div>
        <div className={styles.searchColBox}>
          <div className={styles.searchButtonBox}>
            <button className={styles.searchButtonMember} onClick={() => handleClick('all')}>All</button>
            <button className={styles.searchButtonMember} onClick={() => handleClick('after')}>Upcoming</button>
            <button className={styles.searchButtonMember} onClick={() => handleClick('before')}>Past</button>
            <button className={styles.searchButtonMember} onClick={() => handleClick('region')}>Specific Region</button>
          </div>
          <div className={styles.responseBox}>
            <div className="responseBox"></div>
          </div>
          {/* <div>{responseData}</div> */}
        </div>
    </div>
  );
}

export default Search;