K.Helper = function()
{

};

K.Helper.prototype.constructor = K.Helper;

K.Helper.fixObjectDataTypes = function(object)
{
  for (var obj in object)
  {
    if (object.hasOwnProperty(obj))
    {
      object[obj] = (object[obj] == "true") ? true : false;
    }
  }

  return object;
};

// http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
K.Helper.createArray = function (length)
{
  var arr = new Array(length || 0);
  var i = length;

  if (arguments.length > 1)
  {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = K.Helper.createArray.apply(this, args);
  }

  return arr;
};
