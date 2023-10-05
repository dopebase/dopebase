const decodeData = (data, transformations) => {
  var output = data
  Object.keys(transformations).forEach(function (keyword) {
    output = output && output.split(keyword).join(transformations[keyword]())
  })
  return output
}
module.exports = { decodeData }
