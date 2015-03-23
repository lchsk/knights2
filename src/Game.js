K.Game = function(fps)
{
  // this.renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

  var w = window.innerWidth;
  var h = window.innerHeight;

  // Last time when the frame was updated
  this.lastTime = Date.now();

  // Time since last frame was rendered [ms]
  this.timeSinceLastFrame = 0;

  // Current FPS that limits the rendering
  this.requestedFrameRate = 1000/fps;

  this.renderer = new PIXI.CanvasRenderer(w, h);
  document.body.appendChild(this.renderer.view);
  document.body.style.margin = 0;

  this.stage = new PIXI.Stage(0xFF0000);

  this.map = new K.MapLoader(this, './test.json');

  this.camera = new K.Camera(w, h, this);
};

K.Game.prototype.constructor = K.Game;

K.Game.prototype.create = function()
{

};

K.Game.prototype.frameRate = function()
{
  var now = Date.now();
  this.timeSinceLastFrame = now - this.lastTime;
  this.lastTime = now;
};

K.Game.prototype.update = function()
{
  this.camera.update();
};

K.Game.prototype.draw = function()
{
  this.update();

  // if (K.Key.isDown(K.Key.LEFT))
  // {
  //   this.camera.set(5000, 0);
  // }
  //
  // // if (K.Key.isDown(K.Key.RIGHT))
  // {
  //   this.camera.animateTo(5000, 0);
  // }

  this.map.world.position.x = - this.camera._x;
  this.map.world.position.y = - this.camera._y;

  if ((Date.now() - this.lastTime) >= this.requestedFrameRate)
  {
    this.frameRate();
    this.renderer.render(this.stage);
  }

  requestAnimationFrame(this.draw.bind(this));
};
