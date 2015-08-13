K.Human = function(side, id, game)
{
  PIXI.extras.MovieClip.call(this, []);

  // knights or skeletons
  this.side = side;
  this.id = id;
  this.game = game;

  // Data of SIDE -> ID (eg. knights -> archer)
  // Read from the json settings
  this.data = game.data.A[this.side][this.id];

  this.animations = {};

  // Current state of this character eg. attack
  this.state = "attack";

  this.direction = "left";

  // json.animations[i].directions[d].obj = a;


  // for (var i in this.data.animations)
  // {
  //     this.animations[i] = new K.Animation(this.game.data.T[this.data.animations[i].file]);
  //     this.animations[i].fps = this.data.animations[i].fps;
  //
  //     for (var d in this.data.animations[i].directions)
  //     {
  //         this.animations[i].sides[d] = {}
  //         this.animations[i].sides[d]['start'] = this.data.animations[i].directions[d].frames[0];
  //         this.animations[i].sides[d]['end'] = this.data.animations[i].directions[d].frames[1];
  //     }
  // }

  // this.texture = game.data.T['knights_archer_bow.png'];

};

K.Human.prototype = Object.create(PIXI.extras.MovieClip.prototype);
K.Human.prototype.constructor = K.Human;

K.Human.prototype.setAnimation = function(name)
{
  var data = game.data.A[this.side][this.id];

  if (data.available_animations.indexOf(name) >= 0)
  {
    this.state = name;

    // var anim = data.animations[name];

    // this.minFrame = this.frame = anim.directions[this.direction].frames[0];
    // this.maxFrame = anim.directions[this.direction].frames[1];

    // this.textures = [this.animations[name].texture];
    this.textures = data.animations[name].directions[this.direction].textures;

    this.animationSpeed = data.animations[name].speed;
    this.gotoAndPlay(0);
    this.loop = data.animations[name].loop;
    this.onComplete = function(){console.log('kuniec');};
    // this.animations[name].activate();
  }
};

K.Human.prototype.update = function()
{
    // this.texture = this.animations[this.state].texture;
    // this.texture.crop.x = 0;
    // this.texture.crop.y = 0;
    // this.texture.crop.width = 100;
    // this.texture.crop.height = 100;
    //
    // this.texture.crop = new PIXI.Rectangle(0,0,100,100);
};

K.Human.prototype.changeDirection = function(direction)
{
  if (this.valid_directions.indexOf(direction) >= 0)
  {
    this.direction = direction;
  }
}
