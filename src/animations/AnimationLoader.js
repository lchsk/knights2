K.AnimationLoader = function(loader, filename)
{
  this.loader = loader;
  this.filename = filename;

  // Animations raw data
  // key of this object is ID (eg. archer)
  this.A = {};

  // Groups Animation objects
  // this.animations = {};

  // Textures
  // key = filename, value = PIXI.Texture object
  this.T = {};

  K.JSONLoader.load('./data/archer.json', this.readAnimationData, this);
  // this.loadJSON('./animations/archer.json', this.test, this);
};

K.AnimationLoader.prototype.constructor = K.AnimationLoader;


K.AnimationLoader.prototype.readAnimationData = function(json)
{
  if ( ! this.A.hasOwnProperty(json.side))
  {
      this.A[json.side] = {};
  }

  this.A[json.side][json.id] = json;

  json['available_animations'] = [];

  for (var i in json.animations)
  {
    this.T[json.animations[i].file] = PIXI.Texture.fromImage(json.animations[i].file);

    // How many columns of tiles are in this texture
    var columns = this.T[json.animations[i].file].width / json.tile_width;

    for (var d in json.animations[i].directions)
    {
        json.animations[i].directions[d].textures = [];

        var frames = json.animations[i].directions[d].frames;

        var list = [];

        if (frames[0] < frames[1])
            list = K.Helper.generateList(frames[0], frames[1], 1);
        else
            list = K.Helper.generateList(frames[0], frames[1], -1);

        // for (var idx = frames[0]; idx <= frames[1]; idx++)
        for (var _i = 0; _i < list.length; _i++)
        {
            var idx = list[_i];

            json.animations[i].directions[d].textures.push(
                new PIXI.Texture(
                    this.T[json.animations[i].file],
                    new K.Helper.getRectangle(idx, columns, json.tile_width, json.tile_height)
                )
            );
        }
    }

    // this.minFrame = this.frame = anim.directions[this.direction].frames[0];
    // this.maxFrame = anim.directions[this.direction].frames[1];

    // this.texture = game.data.T[anim.file];

    json['available_animations'].push(i);
  }

  console.log(this.A);
  console.log(this.T);
}


// K.AnimationLoader.prototype._interpretJSON = function(json)
// {
//   var animations = json.animations;
//
//   for (var i = 0; i < animations.length; i++)
//   {
//
//   }
//
//   this.loader.next();
// }
