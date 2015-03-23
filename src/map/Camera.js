K.Camera = function(width, height, game)
{
  this.width = width;
  this.height = height;
  this.game = game;

  this.userCanScroll = true;
  this.isAutoMoving = false;

  this._autoScroll = new PIXI.Point(0, 0);

  this._x = 0;
  this._y = 0;

  // Part of the screen which triggers moving the camera
  // top, right, bottom, left
  this._screen_pct = [0.1, 0.9, 0.9, 0.1];

  this.speed = 3;
};

K.Camera.prototype.constructor = K.Camera;

K.Camera.prototype.update = function()
{
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

K.Camera.prototype.set = function(x, y)
{
  this._x = x;
  this._y = y;

  this._secureCamera();
  this._hideUnusedSprites();
};

EasingFunctions = {
  linear: function (t) { return t },
  easeInQuad: function (t) { return t*t },
  easeOutQuad: function (t) { return t*(2-t) },
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  easeInCubic: function (t) { return t*t*t },
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  easeInQuart: function (t) { return t*t*t*t },
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  easeInQuint: function (t) { return t*t*t*t*t },
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

K.Camera.prototype.animateTo = function(x, y)
{
  if (this.isAutoMoving)
  {
    var dx = this._x - this._autoScroll.x;
    var dy = this._y - this._autoScroll.y;

    var X = x - this._autoScroll.x
    var Y = y - this._autoScroll.y;

    var xp = dx / X + 1;

    // this._x += EasingFunctions.easeOutQuad(xp * 2);

  }
  else
  {
    this._autoScroll.x = this._x;
    this._autoScroll.y = this._y;
    this.isAutoMoving = true;
  }

};

K.Camera.prototype._hideUnusedSprites = function()
{
  for (var i = 0; i < this.game.map.data.children.length; i++)
  {
    var sprite = this.game.map.data.children[i];

    if (sprite.x + 32 > this._x && sprite.x < this._x + this.width)
      sprite.visible = true;
    else
      sprite.visible = false;

    if (sprite.y + 32 > this._y && sprite.y < this._y + this.width)
      sprite.visible = true;
    else
      sprite.visible = false;

  }

};

K.Camera.prototype._secureCamera = function()
{
  this._x = Math.max(this._x, 0);
  this._x = Math.min(this._x, this.game.map.world_width - this.width);

  this._y = Math.max(this._y, 0);
  this._y = Math.min(this._y, this.game.map.world_height - this.height);
};
