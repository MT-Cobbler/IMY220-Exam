<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>IMY 220 Exam - S1</title>


        <!-- Remember to fill this out -->
        <meta name="author" content="Matthew Schoeman">
        <!-- 24_Schoeman - u17029377 -->
    </head>
    <body>
        <form action="results.php" method="get">

            <label for="fname">First name</label><br>
            <input type="text" name="fname" id="fname" placeholder="Morty" /><br><br>

            <label for="lname">Last name</label><br>
            <input type="text" name="lname" id="lname" placeholder="Smith" /><br><br>

            <label for="email">Email</label><br>
            <input type="email" name="email" id="email" placeholder="morty.smith@gmail.com" /><br><br>

            <label for="date">Birthday</label><br>
            <input type="date" name="date" id="date" /><br><br>

            <input type="submit" />
            
        </form>
        <?php
            if(isset($_GET["submit"])){
                echo '<p>';
                    echo 'The following details have been entered: <br>';
                    echo '
                        First name:  '.$_GET["nfname"].' <br>
                        Last name: '.$_GET["nlname"].' <br>
                        Email: '.$_GET["nemail"].' <br>
                        Date: '.$_GET["ndate"].' <br>
                    ';
                echo '</p>';
            }
            
        ?>
        
    </body>
</html>
