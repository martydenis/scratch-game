<?php require_once '../../_includes.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo $language_iso; ?>">
  <head>
    <?php include_once '../../_games_head.php'; ?>
    <title>Scratch game</title>
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
    <script src="<?php echo $js_path; ?>game.bundle.js"></script>
    <script src="./index.js"></script>
  </body>
</html>