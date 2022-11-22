exports.baseName = function(name){
  let base = name.substring(name.lastIndexOf("/") + 1)
  if (base.lastIndexOf(".") !== -1) {
    base = base.substring(0, base.lastIndexOf("."))
  }

  return base
}