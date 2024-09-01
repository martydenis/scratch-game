<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" media="screen">
        <link rel="icon" type="image/svg" href="../martindenis/favicon.svg" />
        <link rel="stylesheet" type="text/css" href="./index.css" media="screen" />
        <title>Pew Pew</title>
    </head>
    <body>
        <div id="container">
            <h1>Scratch game</h1>
            <div id="content">
                <canvas id="canvas" width="400" height="400"></canvas>
                <canvas id="canvas__shadow" width="400" height="400"></canvas>
                <img id="canvas__bg" src="./bg.jpg" alt="mask" width="600" height="600">
                <img id="canvas__brush" src="./brush.svg" alt="mask" width="50" height="50">
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="./index.js"></script>
    </body>
</html>
