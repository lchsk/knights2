K.Game = function(fps)
{
  // this.renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

  this.width = window.innerWidth;
  this.height = window.innerHeight;

  // Last time when the frame was updated
  this.lastTime = Date.now();

  // Time since last frame was rendered [ms]
  this.timeSinceLastFrame = 0;

  // Current FPS that limits the rendering
  this.requestedFrameRate = 1000 / fps;

  this.renderer = new PIXI.autoDetectRenderer(this.width, this.height);

  window.addEventListener('orientationchange', this.resize.bind(this), false);
  window.addEventListener('resize', this.resize.bind(this), false);

  this.isWebGL = (this.renderer instanceof PIXI.WebGLRenderer) ? true : false;

  document.body.appendChild(this.renderer.view);
  document.body.style.margin = 0;

  this.stage = new PIXI.Container();
  this.debugLayer = new PIXI.Graphics();
  this.camera = new K.Camera(this.width, this.height, this);

  this.stage.interactive = true;
  this.stage.on('mousemove', this.camera._mousemove.bind(this.camera));

  this.objects = new PIXI.Container();


  this.loader = new K.Loader(this);
  this.loader.load();



  // this.map = new K.MapLoader(this, './test.json');
  // map is loaded asynchronously!!!

  this.map;
};

K.Game.prototype.constructor = K.Game;

// At this point, the map is loaded
K.Game.prototype.create = function()
{
  // this.camera.set(500, 0);
  // this.camera.animateTo(1000, 200, 3);

  this.stage.addChild(this.objects);

  var k = new K.Human("knights", "archer", this);
  k.setAnimation("attack");

  console.log(k);

   var graph = new Graph([
        [1,1,1,1],
        [0,1,1,0],
        [0,0,1,1]
    ]);
    var start = graph.grid[0][0];
    var end = graph.grid[1][2];
    var result = astar.search(graph, start, end);
    console.log(result);


  this.objects.addChild(k);

  // console.log(b);

  // this.stage.addChild(this.debugLayer);
  this.draw();
};

K.Game.prototype.resize = function()
{
  this.camera.width = this.width = window.innerWidth;
  this.camera.height = this.height = window.innerHeight;
  this.renderer.resize(this.width, this.height);
}

K.Game.prototype.frameRate = function()
{
  var now = Date.now();
  this.timeSinceLastFrame = now - this.lastTime;
  this.lastTime = now;
};

K.Game.prototype.update = function()
{
  this.camera.update();

  // for (var o in this.objects)
  for (var i = 0; i < this.objects.children.length; i++)
  {
      this.objects.children[i].update();
  }
};

K.Game.prototype.draw = function()
{
  this.update();

  if (K.Key.isDown(K.Key.LEFT))
  {
    this.camera.set(5000, 0);
  }

  // if (K.Key.isDown(K.Key.RIGHT))
  // {
  //   this.camera.animateTo(100, 0);
  // }

  this.map.world.position.x = - this.camera._x;
  this.map.world.position.y = - this.camera._y;

  this.debugLayer.position.x = - this.camera._x;
  this.debugLayer.position.y = - this.camera._y;

  this.objects.position.x = - this.camera._x;
  this.objects.position.y = - this.camera._y;


  if ((Date.now() - this.lastTime) >= this.requestedFrameRate)
  {
    this.frameRate();
    this.renderer.render(this.stage);
  }

  requestAnimationFrame(this.draw.bind(this));
};
