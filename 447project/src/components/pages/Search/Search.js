import React, { useState }    from 'react';
import $                      from "jquery";
// import moment                 from 'moment';
import styles                 from './search.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function useForceUpdate(){
  // eslint-disable-next-line
  const [value, setValue] = useState(0); // integer state
  // console.log(value);
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

const Search = () => {
  // eslint-disable-next-line
  const [responseData, setResponseData] = useState(null);
  // const [tier, setTier] = useState(null);
  const forceUpdate = useForceUpdate();

  async function handleClick ( querytype ) {
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
    const Tier = "";
    

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
        Winner:Winner,
        Ranked:Ranked,
        Tier:Tier
      },
      success: function(data) {
        $("div.responseBox").html(data);
        // setResponseData(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error:", jqXHR, textStatus, errorThrown);
        // Handle errors appropriately
      }
    });
    // setTimeout(() => {
    //   forceUpdate();
    // }, 200);
  };

  // async function setTierValue(tierName) {
  //   setTier(tierName);
  // }

  // function BelowButton() {
  //   return (
  //       <DropdownButton id="dropdown-basic-button" title="Find Tier Below" onClick={() => handleClick('tierDown')}>
  //           <Dropdown.Item onClick={() => setTierValue('Premier')}>Premier</Dropdown.Item>
  //           <Dropdown.Item onClick={() => setTierValue('Supermajor')}>Supermajor</Dropdown.Item>
  //           <Dropdown.Item onClick={() => setTierValue('Major')}>Major</Dropdown.Item>
  //           <Dropdown.Item onClick={() => setTierValue('National')}>National</Dropdown.Item>
  //           <Dropdown.Item onClick={() => setTierValue('SuperRegional')}>Super Regional</Dropdown.Item>
  //           <Dropdown.Item onClick={() => setTierValue('Regional')}>Regional</Dropdown.Item>
  //           <Dropdown.Item onClick={() => setTierValue('Notable')}>Notable</Dropdown.Item>
  //           <Dropdown.Item onClick={() => setTierValue('Unranked')}>Unranked</Dropdown.Item>
  //       </DropdownButton>
  //   );
  // }


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
          {/* <BelowButton></BelowButton> */}
          <div className={styles.responseBox}>
            <div className="responseBox"></div>
          </div>
          {/* <div>{responseData}</div> */}
        </div>
    </div>
  );
}

export default Search;