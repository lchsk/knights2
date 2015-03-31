K.AnimationLoader = function()
{

};

K.AnimationLoader.prototype.constructor = K.AnimationLoader;

K.AnimationLoader.prototype.load = function()
{
  var loader = new K.JSONLoader('animations/animations.json');
  console.log("SIEMA");
  loader.loadJSON(this._loadAll.bind(this));

};
