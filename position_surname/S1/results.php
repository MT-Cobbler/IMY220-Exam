<?php
    // See all errors and warnings
    error_reporting(E_ALL);

    // 24_Schoeman

    session_start();
    $_SESSION["firstname"] = isset($_GET['fname']) ? $_GET['fname'] : false;
    $_SESSION["lastname"] = isset($_GET['lname']) ? $_GET['lname'] : false;
    $_SESSION["email"] = isset($_GET['email']) ? $_GET['email'] : false;
    $_SESSION["date"] = isset($_GET['date']) ? $_GET['date'] : false;

    // echo $_SESSION['firstname'], $_SESSION['lastname'], $_SESSION['email'], $_SESSION['date'];
    if($_SESSION["firstname"] && $_SESSION["lastname"] && $_SESSION["email"] && $_SESSION["date"]){
        echo '
            <form method="get" action="index.php">';
                echo'
                    <input type="hidden" name="nfname" value="'.$_SESSION['firstname'].'"/>
                    <input type="hidden" name="nlname" value="'.$_SESSION['lastname'].'"/>
                    <input type="hidden" name="nemail" value="'.$_SESSION['email'].'"/>
                    <input type="hidden" name="ndate" value="'.$_SESSION['date'].'"/>
                ';
                session_unset();
                echo '<button type="submit" name="submit">Log Out</button>
            </form>
        ';
    }
    else{
        echo '
            <h1>You are not logged in</h1>
        ';
    }
    
?>