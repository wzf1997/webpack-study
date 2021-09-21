const loaderUtils = require('loader-utils')
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  console.log('sync ---- noraml')
  this.callback(null, source + options.message)
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('sync ---- pitch')
  console.log(remainingRequest)
  console.log(precedingRequest)
  console.log(data)
  return '-----'
}
