<?php
    $ch = curl_init("https://people.eecs.ku.edu/~j618p208/App.php");

    $nvp= "&test=SENT DATA!!";

    curl_setopt($ch, CURLOPT_POSTFIELDS, $nvp);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    echo curl_exec($ch);
?>