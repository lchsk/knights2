K.JSONLoader = function(filename, obj)
{
  this.filename = filename;
  this.obj = obj;
};

K.JSONLoader.prototype.constructor = K.JSONLoader;

K.JSONLoader.load = function(filename, on_success, obj)
{
  K.JSONLoader._loadJSON(filename,
    function(response)
    {
      on_success.call(obj, JSON.parse(response));
    }
  , obj);
};

K.JSONLoader._loadJSON = function(filename, callback, obj)
{
  // console.log(callback);
  // console.log(obj);

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function()
  {
    if (xobj.readyState == 4 && xobj.status == "200")
    {
      // console.log(xobj.responseText);
      // var t = JSON.parse(xobj.responseText);
      callback.call(obj, xobj.responseText);
      // callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
