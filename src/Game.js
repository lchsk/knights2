K.Game = function()
{
  // this.renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

  var w = window.innerWidth;
  var h = window.innerHeight;

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

K.Game.prototype.draw = function()
{
  this.camera.update();
  this.map.world.position.x = - this.camera._x;
  this.map.world.position.y = - this.camera._y;

  this.renderer.render(this.stage);

  requestAnimationFrame(this.draw.bind(this));

  // console.log(this.stage.getMousePosition());
};
