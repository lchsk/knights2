var sys = require("sys"),
my_http = require("http");
my_http.createServer(function(request,response){
  sys.puts("I got kicked");
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8080);
sys.puts("Server Running on 8080");


var PIXI = require('pixi.js');


var K = K || {};

K.JSONLoader = function(filename)
{
  this.json;
  this.filename = filename;
};

K.JSONLoader.prototype.constructor = K.JSONLoader;

K.JSONLoader.prototype.loadJSON = function()
{
  this._loadJSON(function(response) {
    this.json = JSON.parse(response);
    // console.log(this.json);
  });
};

K.JSONLoader.prototype._loadJSON = function(callback)
{
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', this.filename, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

var loader = new K.JSONLoader('./test.json');
loader.loadJSON();
console.log(loader.json);

var filename = "./test.json";

var json = require(filename);
console.log(json);

K.MapLoader = function(filename)
{
  this.filename = filename;
  // var json = JSON.parse(loadJSON('./test.json'));
  // console.log(loadJSON('./test.json'));
  // this.json = require(this.filename);
};

K.MapLoader.prototype.constructor = K.MapLoader;

K.MapLoader.prototype.getRect = function(id)
{
};


var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

document.body.style.margin = 0;

var stage = new PIXI.Stage;

var a = PIXI.Texture.fromImage('tiles.png');

var r = new PIXI.Rectangle(64,32,32,32);
var b = new PIXI.Texture(a, r);

var sprite = new PIXI.Sprite(b);

var mapLoader = new K.MapLoader('./test.json');
  mapLoader.getRect(213);

// zombie.position.x = window.innerWidth / 2 - 150;
// zombie.position.y = window.innerHeight / 2 - 150;
// zombie.scale.x = zombie.scale.y = 0.1;
sprite.position.x = 0;
sprite.position.y = 0;

stage.addChild(sprite);

function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
}

draw();
