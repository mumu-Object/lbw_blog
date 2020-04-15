function serializeToJson(form) {
  var obj = {};
  var f = form.serializeArray();
  f.forEach(function(item){
      obj[item.name] = item.value
  });
  return obj;
}