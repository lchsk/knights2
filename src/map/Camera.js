K.Camera = function(width, height, game)
{
  this.width = width;
  this.height = height;
  this.game = game;

  // this.userCanScroll = true;

  // True if the map is being automatically scrolled
  this.isAutoMoving = false;

  // If isAutoMoving == true, this variable holds the time
  // in which the movement should be completed.
  // [miliseconds]
  this.maxTime = 0;

  // How much time passed since the movement began
  // [miliseconds]
  this.time = 0;

  this._autoScrollStart = new PIXI.Point(0, 0);
  this._autoScrollEnd = new PIXI.Point(0, 0);

  // Current position of the map
  this._x = 0;
  this._y = 0;

  // Part of the screen which triggers moving the camera
  // top, right, bottom, left
  this._screen_pct = [0.1, 0.9, 0.9, 0.1];

  // How fast a user can scroll the map
  this.speed = 5;

};

K.Camera.prototype.constructor = K.Camera;

K.Camera.prototype._updateUserScrolling = function()
{
  if (this.isAutoMoving) return;

  var mouse = this.game.stage.getMousePosition();

  // a simple hack to override initial value of the mouse position
  if (mouse.x == 0 && mouse.y == 0) return;

  var w = mouse.x / this.width;
  var h = mouse.y / this.height;

  var moved = false;

  if (w >= 0 && w < this._screen_pct[3])
  {
    // Move left
    this._x -= this.speed;
    moved = true;
  }
  if (w > this._screen_pct[1] && w <= 1)
  {
    // Move right
    this._x += this.speed;
    moved = true;
  }
  if (h >= 0 && h < this._screen_pct[0])
  {
    // Move up
    this._y -= this.speed;
    moved = true;
  }
  if (h <= 1 && h > this._screen_pct[2])
  {
    // Move down
    this._y += this.speed;
    moved = true;
  }

  if (moved)
  {
    this._secureCamera();
    this._hideUnusedSprites();
  }
};

K.Camera.prototype.update = function()
{
  this._updateAutoScrolling();
  this._updateUserScrolling();
};

K.Camera.prototype._updateAutoScrolling = function()
{
  if (this.isAutoMoving)
  {
    var factor = K.Easing.easeInOutCubic(this.time / this.maxTime);

    this._x = factor * (this._autoScrollEnd.x - this._autoScrollStart.x) + this._autoScrollStart.x;
    this._y = factor * (this._autoScrollEnd.y - this._autoScrollStart.y) + this._autoScrollStart.y;

    this.time += this.game.timeSinceLastFrame;

    if (this.time > this.maxTime)
    {
      this.isAutoMoving = false;
    }
  }
};

K.Camera.prototype.set = function(x, y)
{
  this._x = x;
  this._y = y;

  this._secureCamera();
  this._hideUnusedSprites();
};

K.Camera.prototype.animateTo = function(x, y, maxTime)
{
  if ( ! this.isAutoMoving)
  {
    this._autoScrollStart.x = this._x;
    this._autoScrollStart.y = this._y;
    this._securePosition(this._autoScrollStart);

    this._autoScrollEnd.x = x;
    this._autoScrollEnd.y = y;
    this._securePosition(this._autoScrollEnd);

    this.isAutoMoving = true;
    this.maxTime = maxTime * 1000;
    this.time = 0.0;

    this._hideUnusedSprites();
  }
};

K.Camera.prototype._hideUnusedSprites = function()
{
  for (var i = 0; i < this.game.map.data.children.length; i++)
  {
    var sprite = this.game.map.data.children[i];

    if (sprite.x + this.game.map.tile_width > this._x && sprite.x < this._x + this.width)
      sprite.visible = true;
    else
      sprite.visible = false;

    if (sprite.y + this.game.map.tile_height > this._y && sprite.y < this._y + this.width)
      sprite.visible = true;
    else
      sprite.visible = false;
  }
};

K.Camera.prototype._securePosition = function(point)
{
  point.x = Math.max(point.x, 0);
  point.x = Math.min(point.x, this.game.map.world_width - this.width);

  point.y = Math.max(point.y, 0);
  point.y = Math.min(point.y, this.game.map.world_height - this.height);
};

K.Camera.prototype._secureCamera = function()
{
  if (this.game.map.world_width && this.game.map.world_height)
  {
    var p = new PIXI.Point(this._x, this._y);
    this._securePosition(p);
    this._x = p.x;
    this._y = p.y;
  }
};
