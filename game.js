








var r = new PIXI.Rectangle(64,32,32,32);
var b = new PIXI.Texture(a, r);

var sprite = new PIXI.Sprite(b);

var mapLoader = new K.MapLoader('./test.json');
mapLoader.getRect(213);

sprite.position.x = 0;
sprite.position.y = 0;

stage.addChild(sprite);

function draw(){
  renderer.render(stage);
  requestAnimationFrame(draw);
  
}

draw();
