<?php
header('Access-Control-Allow-Origin: *');

function select_all() {
	return ["SELECT * FROM Readable_Tournaments ORDER BY CASE
	WHEN Tier_Name = 'Premier' THEN 1
	WHEN Tier_Name = 'SuperMajor+' THEN 2
	WHEN Tier_Name = 'SuperMajor' THEN 3
	WHEN Tier_Name = 'Major+' THEN 4
	WHEN Tier_Name = 'Major' THEN 5
	WHEN Tier_Name = 'National' THEN 6
	WHEN Tier_Name = 'SuperRegional' THEN 7
	WHEN Tier_Name = 'Regional' THEN 8
	WHEN Tier_Name = 'Notable' THEN 9
	WHEN Tier_Name = 'Unranked' THEN 10
	END ASC"];
}

function select_before_date($date) {
	return ["SELECT * FROM Readable_Tournaments WHERE `Date` < '$date' ORDER BY CASE
	WHEN Tier_Name = 'Premier' THEN 1
	WHEN Tier_Name = 'SuperMajor+' THEN 2
	WHEN Tier_Name = 'SuperMajor' THEN 3
	WHEN Tier_Name = 'Major+' THEN 4
	WHEN Tier_Name = 'Major' THEN 5
	WHEN Tier_Name = 'National' THEN 6
	WHEN Tier_Name = 'SuperRegional' THEN 7
	WHEN Tier_Name = 'Regional' THEN 8
	WHEN Tier_Name = 'Notable' THEN 9
	WHEN Tier_Name = 'Unranked' THEN 10
	END ASC"];
}

function select_after_date($date) {
	return ["SELECT * FROM Readable_Tournaments WHERE `Date` >= '$date' ORDER BY CASE
	WHEN Tier_Name = 'Premier' THEN 1
	WHEN Tier_Name = 'SuperMajor+' THEN 2
	WHEN Tier_Name = 'SuperMajor' THEN 3
	WHEN Tier_Name = 'Major+' THEN 4
	WHEN Tier_Name = 'Major' THEN 5
	WHEN Tier_Name = 'National' THEN 6
	WHEN Tier_Name = 'SuperRegional' THEN 7
	WHEN Tier_Name = 'Regional' THEN 8
	WHEN Tier_Name = 'Notable' THEN 9
	WHEN Tier_Name = 'Unranked' THEN 10
	END ASC"];
}

function select_by_region($region) {
	return ["SELECT * FROM Readable_Tournaments WHERE Region = '$region' ORDER BY CASE
	WHEN Tier_Name = 'Premier' THEN 1
	WHEN Tier_Name = 'SuperMajor+' THEN 2
	WHEN Tier_Name = 'SuperMajor' THEN 3
	WHEN Tier_Name = 'Major+' THEN 4
	WHEN Tier_Name = 'Major' THEN 5
	WHEN Tier_Name = 'National' THEN 6
	WHEN Tier_Name = 'SuperRegional' THEN 7
	WHEN Tier_Name = 'Regional' THEN 8
	WHEN Tier_Name = 'Notable' THEN 9
	WHEN Tier_Name = 'Unranked' THEN 10
	END ASC"];
}

function select_by_tier($tier) {
	return ["SELECT * FROM Readable_Tournaments WHERE `Tier_Name` = '$tier' ORDER BY CASE
	WHEN Tier_Name = 'Premier' THEN 1
	WHEN Tier_Name = 'SuperMajor+' THEN 2
	WHEN Tier_Name = 'SuperMajor' THEN 3
	WHEN Tier_Name = 'Major+' THEN 4
	WHEN Tier_Name = 'Major' THEN 5
	WHEN Tier_Name = 'National' THEN 6
	WHEN Tier_Name = 'SuperRegional' THEN 7
	WHEN Tier_Name = 'Regional' THEN 8
	WHEN Tier_Name = 'Notable' THEN 9
	WHEN Tier_Name = 'Unranked' THEN 10
	END ASC"];
}

function select_by_tier_above_or_equal($tier) {
	return ["SELECT * FROM Readable_Tournaments WHERE Points >= (SELECT Tiers.Threshold FROM Tiers WHERE Tiers.Tier_Name = '$tier') ORDER BY CASE
	WHEN Tier_Name = 'Premier' THEN 1
	WHEN Tier_Name = 'SuperMajor+' THEN 2
	WHEN Tier_Name = 'SuperMajor' THEN 3
	WHEN Tier_Name = 'Major+' THEN 4
	WHEN Tier_Name = 'Major' THEN 5
	WHEN Tier_Name = 'National' THEN 6
	WHEN Tier_Name = 'SuperRegional' THEN 7
	WHEN Tier_Name = 'Regional' THEN 8
	WHEN Tier_Name = 'Notable' THEN 9
	WHEN Tier_Name = 'Unranked' THEN 10
	END ASC"];
}

function select_by_tier_below($tier) {
	return ["SELECT * FROM Readable_Tournaments WHERE Points < (SELECT Tiers.Threshold FROM Tiers WHERE Tiers.Tier_Name = '$tier') ORDER BY CASE
	WHEN Tier_Name = 'Premier' THEN 1
	WHEN Tier_Name = 'SuperMajor+' THEN 2
	WHEN Tier_Name = 'SuperMajor' THEN 3
	WHEN Tier_Name = 'Major+' THEN 4
	WHEN Tier_Name = 'Major' THEN 5
	WHEN Tier_Name = 'National' THEN 6
	WHEN Tier_Name = 'SuperRegional' THEN 7
	WHEN Tier_Name = 'Regional' THEN 8
	WHEN Tier_Name = 'Notable' THEN 9
	WHEN Tier_Name = 'Unranked' THEN 10
	END ASC"];
}

function select_players_at_tournament($tournament) {
	return ["SELECT Ranked_Players.Rank, Ranked_Players.Name AS Players 
	FROM Tournaments JOIN Ranked_Players JOIN Attending 
	ON Tournaments.Tid = Attending.Tid AND Ranked_Players.Pid = Attending.Pid 
	WHERE Tournaments.Name = '$tournament'
	ORDER BY Ranked_Players.Rank"];
}

function add_tournament($name, $date, $location, $region, $numPlayers, $winner, $ranked) {
	$val1 = "INSERT INTO Tournaments (`Name`, `Date`, `Location`, Rid, Num_Players";
	if ($winner) {
		$val1 .= ", Winner) ";
	} else {
		$val1 .= ") ";
	}
	$val1 .= "VALUES ('$name', '$date', '$location', (SELECT Rid FROM Regions WHERE `Name` = '$region'), $numPlayers";
	if ($winner) {
		$val1 .= ", '$winner')";
	} else {
		$val1 .= ")";
	}
	$val2 = "SET @Tid = (SELECT Tid FROM Tournaments WHERE `Name` = '$name')";
	$val3 = "";
	if ($ranked) {
		$val3 = "INSERT INTO Attending (Tid, Pid) VALUES ";
		foreach ($ranked as $player) {
			$val3 .= "(@Tid, (SELECT Pid FROM Ranked_Players WHERE Name = '$player'))";
			if (next($ranked)) {
				$val3 .= ", ";
			} else {
				$val3 .= ";";
			}
		}
	}
	$val4 = "CALL update_tournament(@Tid)";
	return [$val1, $val2, $val3, $val4];
}

// Create SQL queries
$queries = "";
$whichQuery = $_POST['whichQuery'];
switch ($whichQuery) {
	case "all":
		$queries = select_all();
		break;
	case "before":
		$queries = select_before_date($_POST['Date']);
		break;
	case "after":
		$queries = select_after_date($_POST['Date']);
		break;
	case "region":
		$queries = select_by_region($_POST['Region']);
		break;
	case "tier":
		$queries = select_by_tier($_POST['Tier']);
		break;
	case "tierUp":
		$queries = select_by_tier_above_or_equal($_POST['Tier']);
		break;
	case "tierDown":
		$queries = select_by_tier_below($_POST['Tier']);
		break;
	case "tournament":
		$queries = select_players_at_tournament($_POST['Tournament']);
		break;
	case "add":
		$queries = add_tournament_with_winner($_POST['Tournament'], 
											  $_POST['Date'], 
											  $_POST['Location'], 
											  $_POST['Region'], 
											  $_POST['numPlayers'], 
											  $_POST['Winner'], 
											  $_POST['Ranked']);
		break;
	default:
		$queries = select_all();
		break;
}

// Connect to MySQL server, select database
$conn = mysqli_connect('mysql.eecs.ku.edu', '447s24_j618p208', 'Pai4Xiva')
						or die('Could not connect: ' . mysql_error());
mysqli_select_db($conn, '447s24_j618p208') or die('Could not select database');

// Send SQL Queries
mysqli_begin_transaction($conn);
try {
	foreach ($queries as $query) { // Only need for the foreach execution of this is to allow adding a tournament with ranked players and then updating it
		$result = mysqli_query($conn, $query) or die('Query failed: ' . mysqli_error());
		if ($result->num_rows != 0) {
			echo "<div class='table100'>";
			echo "<table>\n";
			echo "<thead>\n";
			echo "\t<tr class='table100-head'>\n";
			while ($label = mysqli_fetch_field($result)) {
				echo "\t\t<th class='$label->name'>$label->name</th>\n";
			}
			echo "\t</tr>\n";
			echo "</thead>\n";
			echo "\t<tbody>\n";
			while ($line = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
				foreach ($line as $col_value) {
					echo "\t\t<td class='$label->name'>$col_value</td>\n";
				}
				echo "\t</tr>\n";
			}
			echo "\t</tbody>\n";
			echo "</table>\n";
			echo "</div>";
			// mysqli_free_result($result);
		}
	}
	mysqli_commit($conn);
} catch (Exception $e) {
	mysqli_rollback($conn);
	die("Caught exception: " . $e->getMessage());
}

// Close connection
mysqli_close($conn);
?>