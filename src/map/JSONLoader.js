K.JSONLoader = function(filename)
{
  this.filename = filename;
};

K.JSONLoader.prototype.constructor = K.JSONLoader;

K.JSONLoader.prototype.loadJSON = function(on_success)
{
  this._loadJSON(function(response) {
    on_success(JSON.parse(response));

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
