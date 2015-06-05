K.MapLoader = function(loader, filename)
{
  // Map filename
  this.filename = filename;

  // Game object
  this.loader = loader;
  this.game = this.loader.game;

  this.tilesets = [];

  this.tileproperties = {};
  // this.debugLayerTmp = {};
  this.tmp = false;

  this.world = new PIXI.DisplayObjectContainer();

  // Map data
  this.data = new PIXI.DisplayObjectContainer();
  this.camera = new PIXI.DisplayObjectContainer();

  this.world.addChild(this.data);

  this.game.stage.addChild(this.world);
  // this.game.stage.renderable = false;
};

K.MapLoader.prototype.constructor = K.MapLoader;

K.MapLoader.prototype.load = function()
{
  K.JSONLoader.load(this.filename, this._interpretJSON.bind(this));
  // loader.loadJSON(this._interpretJSON.bind(this));
};

K.MapLoader.prototype._getRect = function(id, tileset)
{
  id = id - tileset.first_id + 1;

  var h = (id - 1) % tileset.width;
  var v = Math.floor((id - 1) / tileset.width);

  var r = new PIXI.Rectangle(h * tileset.tilewidth, v * tileset.tileheight, tileset.tilewidth, tileset.tileheight);

  return r;
};

K.MapLoader.prototype._loadTileProperties = function(tileset)
{
  var properties = tileset.tileproperties;

  if (properties)
  {
    var first = tileset.firstgid;
    for (var p in properties)
    {
      var id = first + parseInt(p);
      this.tileproperties[id] = K.Helper.fixObjectDataTypes(properties[p]);
    }
  }
};

K.MapLoader.prototype._loadTilesets = function(json)
{
  for (var i = 0; i < json.tilesets.length; i++)
  {
    var tileset = json.tilesets[i];

    this._loadTileProperties(tileset);

    var path = tileset.image.split("/");
    var image = path[path.length - 1];

    var obj = {}
    obj['name'] = image;
    obj['texture'] = PIXI.Texture.fromImage(image);
    obj['first_id'] = tileset.firstgid;
    obj['tilewidth'] = tileset.tilewidth;
    obj['tileheight'] = tileset.tileheight;
    obj['width'] = Math.floor(tileset.imagewidth / tileset.tilewidth);
    obj['height'] = Math.floor(tileset.imageheight / tileset.tileheight);
    obj['last_id'] = obj['first_id'] + obj['width'] * obj['height'] - 1;

    this.tilesets.push(obj);
  }
};

K.MapLoader.prototype._getTileset = function(id)
{
  for (var i = 0; i < this.tilesets.length; i++)
  {
    var tileset = this.tilesets[i];

    if (id >= tileset.first_id && id <= tileset.last_id)
    {
      return tileset;
    }
  }

  return false;
};


K.MapLoader.prototype._interpretJSON = function(json)
{
  this._loadTilesets(json);

  // Number of tiles
  this.map_width = json.height;

  // Number of tiles
  this.map_height = json.width;

  this.tmp = K.Helper.createArray(this.map_width, this.map_height);

  // Pixels
  this.tile_width = json.tilewidth;

  // Pixels
  this.tile_height = json.tileheight;

  // Pixels
  this.world_width = this.map_width * this.tile_width;

  // Pixels
  this.world_height = this.map_height * this.tile_height;

  for(var j = 0; j < json.layers.length; j++)
  {
    var x = 0;
    var y = 0;

    if (json.layers[j].visible)
    {
      for(var i = 0; i < json.layers[j].data.length; i++)
      {
        var v = json.layers[j].data[i];

        if (v > 0)
        {
          var tileset = this._getTileset(v)
          var r = this._getRect(v, tileset);

          var b = new PIXI.Texture(tileset.texture, r);
          var sprite = new PIXI.Sprite(b);
          sprite.position.x = x;
          sprite.position.y = y;
          this.data.addChild(sprite);

          this._addDebugItem(v, x, y);
        }

        x += this.tile_width;

        if ((i + 1) % this.map_width == 0)
        {
          x = 0;
          y += this.tile_height;
        }
      }
    }
  }

  this._drawDebugLayer();

  this.loader.next();
  // this.game.create.bind(this.game)();
};

K.MapLoader.prototype._addDebugItem = function(id, x, y)
{
  if (this.tileproperties[id])
  {
    // var key = { 'x' : x, 'y' : y };

    var colour = false;

    if (this.tileproperties[id]['walkable'])
      colour = 0x00FF00;
    else
      colour = 0xFF0000;

    if (colour)
    {
      // this.debugLayerTmp[x] = this.debugLayerTmp[x] || {};
      // this.debugLayerTmp[x][y] = colour;
      this.tmp[x/32][y/32] = colour;
      // this._test(x,y);
    }
  }
};

K.MapLoader.prototype._test = function(x, y)
{
  this.game.debugLayer.beginFill(this.tmp[x][y], 0.5);
  this.game.debugLayer.drawRect(x*32, y*32, 32, 32);
  this.game.debugLayer.endFill();
};

K.MapLoader.prototype._drawDebugLayer = function()
{

  for (var i = 0; i < 50; i++)
  {
    for (var j = 0; j < 50; j++)
    {
      if (this.tmp[i][j])
      {
        this._test(i, j);
      }
    }
  }

  var i = 0;
  for (var x in this.debugLayerTmp)
  {
    if (this.debugLayerTmp.hasOwnProperty(x))
    {
      for (var y in this.debugLayerTmp[x])
      {
        if (this.debugLayerTmp[x].hasOwnProperty(y))
        {
          i++;
          // console.log(x, y, this.debugLayerTmp[x][y]);
          // this._test(x, y);

          // if (i > 1)
            // return;

        }
      }
    }
  }
};
