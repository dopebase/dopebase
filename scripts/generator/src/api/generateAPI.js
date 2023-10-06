var fs = require('fs')

var { decodeTemplate } = require('../utils/decodeTemplate')
var { outputPath, templatesPath } = require('../config')

const generateAPI = (fileName, schema, allSchemas) => {
  const { lowercasePluralName } = schema
  var dir = outputPath() + `../api/` + lowercasePluralName

  const data = fs.readFileSync(`${templatesPath}api/` + fileName, 'utf8')
  const finalData = decodeTemplate(data, schema, allSchemas)

  const filePath = dir + '/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated API at ' + filePath)
  })
}
const generateAPIs = (schema, allSchemas) => {
  generateAPI('list.ts', schema, allSchemas)
  generateAPI('update.ts', schema, allSchemas)
  generateAPI('add.ts', schema, allSchemas)
  generateAPI('delete.ts', schema, allSchemas)
  generateAPI('view.ts', schema, allSchemas)
}

module.exports = {
  generateAPIs,
}
