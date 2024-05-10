import React, { useState }    from 'react';
import $                      from "jquery";
// import moment                 from 'moment';
import styles                 from './home.module.css';

function useForceUpdate(){
  // eslint-disable-next-line
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

const Home = () => {
  // eslint-disable-next-line
  const [responseData, setResponseData] = useState(null);
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    const url = "https://people.eecs.ku.edu/~j618p208/App.php";
    const whichQuery = "after";
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
        Winner:Winner, Ranked:Ranked,
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

  handleClick();

  return (
    <div className={styles.page}>
        <div className={styles.titleBox}>
          <h1>Smash Tournament Tracker</h1>
          <h3>Track tournaments, winners, regions, and more!</h3>
        </div>
        <div className={styles.twoColumnBox}>
          <div className={styles.singleColumn}>
            <h4>Summary</h4>
            <p>
              Smash Tournament Tracker is a tool for keeping up-to-date with all the most recent smash tournaments by region!
              With a large database of tournaments, it's an easy way to skim past, upcoming, and regional tournaments!
              You can also view their winners, tier, and location!
            </p>
          </div>
          <div className={styles.singleColumn}>
            <h4>Upcoming Events</h4>
            <div className="responseBox"></div>
          </div>
        </div>
    </div>
  );
}

export default Home;