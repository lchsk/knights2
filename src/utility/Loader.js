K.Loader = function(gameObject)
{
  this.game = gameObject;
  this.list = [];
  this.currentID = 0;



  this.game.map = new K.MapLoader(this, './maps/untitled.json');

  this.list.push(this.game.map);

  this.game.data = new K.AnimationLoader(this, './animations/animations.json');
  // this.list.push(this.game.animations);

  // this._prepareMap();

  this._updateList();
};

K.Loader.prototype.constructor = K.Loader;

K.Loader.prototype._prepareMap = function()
{
};

K.Loader.prototype._updateList = function()
{
  this.itemsNumber = this.list.length;
};

K.Loader.prototype.load = function()
{
  this._loadNext();
};

K.Loader.prototype.next = function()
{
  this.currentID++;
  this._loadNext();
};

K.Loader.prototype._loadNext = function()
{
  if (this.currentID < this.itemsNumber)
    this.list[this.currentID].load();
  else
  {
    console.log("Loading finished.");
    this.game.create();
  }
};
