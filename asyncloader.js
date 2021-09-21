const loaderUtils = require('loader-utils')
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const asyncfunc = this.async()
  console.log('async ----- noraml')
  setTimeout(() => {
    source += '我是异步的'
    asyncfunc(null, source)
  }, 200)
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('async ---- pitch')
  console.log(remainingRequest)
  console.log(precedingRequest)
  console.log(data)
}
