import React from 'react';
import styles from './entry.module.css';

const Entry = () => {
  return (
    <div className={styles.page}>
        <h2>Tournament Entry</h2>
        <h3>Add a tournament to our database!</h3>
        <div className={styles.singleColumn}>
          <form action="/submit_tournament_info" method="post">
            <div className={styles.singleRow}>
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required></input>
            </div>

            <div className={styles.singleRow}>
              <label for="date">Date:</label>
              <input type="date" id="date" name="date" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required></input>
            </div>

            <div className={styles.singleRow}>
              <label for="location">Location:</label>
              <input type="text" id="location" name="location" required></input>
            </div>

            <div className={styles.singleRow}>
              <label for="region">Region:</label>
              <input type="text" id="region" name="region" required></input>
            </div>

            <div className={styles.singleRow}>
              <label for="player_count">Player Count:</label>
              <input type="number" id="player_count" name="player_count" required></input>
            </div>

            <div className={styles.singleRow}>
              <label for="winner">Winner:</label>
              <input type="text" id="winner" name="winner" required></input>
            </div>

            <div className={styles.singleRow}>
              <label for="rank">Rank:</label>
              <input type="text" id="rank" name="rank" required></input>
            </div>

            <div className={styles.singleRowButton}>
              <input type="submit" value="Submit" className={styles.buttonS}></input>
            </div>
          </form>
        </div>
    </div>
  );
}

export default Entry;