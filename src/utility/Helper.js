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
