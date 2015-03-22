K.Camera = function(width, height, game)
{
  this.width = width;
  this.height = height;
  this.game = game;

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
  // console.log(mouse);
  // if (mouse.x < 0 || mouse.x > this.width)
    // return;

  var w = mouse.x / this.width;
  var h = mouse.y / this.height;

  if (w >= 0 && w < this._screen_pct[3])
  {
    // Move left
    this._x -= this.speed;
  }
  if (w > this._screen_pct[1] && w <= 1)
  {
    // Move right
    this._x += this.speed;
  }
  if (h >= 0 && h < this._screen_pct[0])
  {
    // Move up
    this._y -= this.speed;
  }
  if (h <= 1 && h > this._screen_pct[2])
  {
    // Move down
    this._y += this.speed;
  }

  this._secureCamera();

  this._hideUnusedSprites();
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

    // if (sprite.position.x + 32 < this._x)
      // sprite.visible = false;
    // else
      // sprite.visible = true;

    // if (sprite.position.x > this._x + this.width)
      // sprite.visible = false;
  }

};

K.Camera.prototype._secureCamera = function()
{
  this._x = Math.max(this._x, 0);
  this._x = Math.min(this._x, this.game.map.world_width - this.width);

  this._y = Math.max(this._y, 0);
  this._y = Math.min(this._y, this.game.map.world_height - this.height);
};
