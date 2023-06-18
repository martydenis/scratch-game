<?php require_once '../../_includes.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo $language_iso; ?>">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="icon" type="image/svg" href="<?php echo $favicon_path; ?>favicon.svg" />
    <link rel="stylesheet" type="text/css" href="<?php echo $css_path; ?>game.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="./index.css" media="screen" />
    <title>Scratch game</title>
  </head>

  <body>
    <a href="<?php echo $sandbox_path; ?>" id="back">Back</a>
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
    <script src="<?php echo $js_path; ?>game.bundle.js"></script>
    <script src="./index.js"></script>
  </body>
</html>