class ScratchGame {
  constructor(brushSize) {
    this.brushSize = 60;
    this.container = $('#content');
    this.canvas = $('#canvas');
    this.bg = $('#canvas__bg').get(0);
    this.brush = $('#canvas__brush').get(0);
    this.shadow = $('#canvas__shadow');
    this.ctx = this.canvas.get(0).getContext('2d');
    this.ctxShadow = this.shadow.get(0).getContext('2d');
    this.clickingOnCanvas = false;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.canvasOffsetX = 0;
    this.canvasOffsetY = 0;

    this.lastCoordinates = new Map();
    this.progressGrid = new Set();
    this.progressGridRemaining = new Set();
    this.state = 'playing';

    this.init();
    this.initEvents();
  }

  init() {
    this.lastCoordinates.clear();
    this.progressGrid.clear();
    this.progressGridRemaining.clear();

    this.prepareCanvas();
    this.buildMap();
  }

  prepareCanvas() {
    this.canvasWidth = this.canvas.width();
    this.canvasHeight = this.canvas.height();
    this.canvasOffsetX = this.canvas.offset().left;
    this.canvasOffsetY = this.canvas.offset().top;

    this.canvas.get(0).width = this.canvasWidth;
    this.canvas.get(0).height = this.canvasHeight;
    this.shadow.get(0).width = this.canvasWidth;
    this.shadow.get(0).height = this.canvasHeight;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.drawImage(this.bg, 0, 0, this.canvasWidth, this.canvasHeight);

    this.ctxShadow.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctxShadow.fillStyle = 'rgba(0,0,0,0.30)';
    this.ctxShadow.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.container.css('background-image', 'url("./scratched.jpg")');
  }

  buildMap() {
    const rows = Math.floor(this.canvasWidth / this.brushSize) + 1;
    const columns = Math.floor(this.canvasHeight / this.brushSize) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        this.progressGrid.add(r + '-' + c);
      }
    }

    this.progressGridRemaining = new Set([...this.progressGrid]);
  }

  initEvents() {
    let that = this;
    $(window).on('resize', function () {
      that.init();
    });

    that.canvas.on('mousedown', function (e) {
      that.clickingOnCanvas = true;
      that.lastCoordinates.set(0, {
        'x': e.offsetX,
        'y': e.offsetY
      });
    });

    that.canvas.on('touchstart', function (e) {
      that.clickingOnCanvas = true;
      that.touchHandler(e.targetTouches, function (touch) {
        that.lastCoordinates.set(touch.identifier, {
          'x': touch.pageX,
          'y': touch.pageY,
        });
      });
    });

    $(document).on('mouseup', function () {
      that.clickingOnCanvas = false;
      that.lastCoordinates.clear();
    });

    $(document).on('touchend', function (e) {
      if (e.targetTouches.length == 0) {
        that.clickingOnCanvas = false;
        that.lastCoordinates.clear();
      }
    });

    that.canvas.on('mousemove', function (e) {
      if (that.clickingOnCanvas) {
        that.scratch(e.offsetX, e.offsetY);
      }
    });

    that.canvas.on('touchmove', function (e) {
      e.preventDefault();
      if (that.clickingOnCanvas) {
        that.touchHandler(e.targetTouches, function (touch) {
          let x = touch.pageX - that.canvasOffsetX;
          let y = touch.pageY - that.canvasOffsetY;

          that.scratch(x, y, touch.identifier, touch.force);
        });
      }
    });
  }

  touchHandler(touches, fct) {
    for (let i = 0; i < touches.length; i++) {
      fct(touches[i]);
    }
  }

  updateProgress(x, y) {
    const row = Math.floor((x + this.brushSize / 2) / this.brushSize);
    const column = Math.floor((y + this.brushSize / 2) / this.brushSize);

    this.progressGridRemaining.delete(row + '-' + column);

    if (this.state == 'playing' && this.progressGrid.size / this.progressGridRemaining.size > 1.8) {
      this.state = 'won';
    }
  }

  getDistanceFromOldPosition(x, y, id) {
    const deltaX = Math.abs(this.lastCoordinates.get(id).x - x);
    const deltaY = Math.abs(this.lastCoordinates.get(id).y - y);
    const distance = Math.round(Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)));

    return distance;
  }

  getAngleFromOldPosition(x, y, id) {
    const previousX = this.lastCoordinates.get(id).x;
    const previousY = this.lastCoordinates.get(id).y;
    let angle = Math.atan2(y - previousY, x - previousX);

    return angle;
  }

  scratch(x, y, id, force) {
    if (id == undefined) id = 0;
    if (typeof force === 'undefined')
      force = 0.16667;
    else if (force < 0.05)
      force = 0.05;


    const brushSize = this.brushSize * Math.min((force * 6), 1);
    const distance = this.getDistanceFromOldPosition(x, y, id);
    const angle = this.getAngleFromOldPosition(x, y, id);

    if (distance > brushSize / 5) {
      this.draw(x, y, angle, brushSize);

      this.lastCoordinates.set(id, { 'x': x, 'y': y });
      this.updateProgress(x, y);
    }
  }

  draw(x, y, angle, brushSize) {
    const brush = this.brush;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.drawImage(brush, -brushSize / 2, -brushSize / 2, brushSize, brushSize);
    this.ctx.rotate(-angle);
    this.ctx.translate(-x, -y);

    this.ctxShadow.globalCompositeOperation = 'destination-out';
    this.ctxShadow.translate(x + 3, y + 3);
    this.ctxShadow.rotate(angle);
    this.ctxShadow.drawImage(brush, -brushSize / 2, -brushSize / 2, brushSize, brushSize);
    this.ctxShadow.rotate(-angle);
    this.ctxShadow.translate(-x - 3, -y - 3);
  }
}

$(window).on('load', function () {
  var scratchGame = new ScratchGame();
});