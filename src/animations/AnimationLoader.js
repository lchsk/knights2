K.AnimationLoader = function(loader, filename)
{
  this.loader = loader;
  this.filename = filename;

  // Animations data
  // key of this object is ID (eg. archer)
  this.A = {};

  // Textures
  // key = filename, value = PIXI.Texture object
  this.T = {};

  K.JSONLoader.load('./animations/archer.json', this.readAnimationData, this);
  // this.loadJSON('./animations/archer.json', this.test, this);
};

K.AnimationLoader.prototype.constructor = K.AnimationLoader;


K.AnimationLoader.prototype.readAnimationData = function(json)
{
  this.A[json.id] = json;

  json['available_animations'] = []

  for (i in json.animations)
  {
    this.T[json.animations[i].file] = PIXI.Texture.fromImage(json.animations[i].file);
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
