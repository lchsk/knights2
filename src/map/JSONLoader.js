K.JSONLoader = function(filename)
{
  this.filename = filename;
};

K.JSONLoader.prototype.constructor = K.JSONLoader;

K.JSONLoader.load = function(filename, on_success)
{
  K.JSONLoader._loadJSON(filename,
    function(response)
    {
      on_success(JSON.parse(response));
    }
  );
};

K.JSONLoader._loadJSON = function(filename, callback)
{
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function()
  {
    if (xobj.readyState == 4 && xobj.status == "200")
    {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
