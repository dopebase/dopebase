var fs = require('fs')

var { decodeTemplate } = require('../utils/decodeTemplate')
var { populatedDataWithFormFields } = require('./populatedDataWithFormFields')
var { outputPath, templatesPath } = require('../config')

function generateViewFile(
  fileName,
  formType,
  schema,
  allSchemas,
  viewMapData,
  viewKeyword,
  skipNonEditableFields,
) {
  const {
    fields,
    displayName,
    singularName,
    lowercasePluralName,
    titleFieldKey,
    singularCapitalName,
  } = schema
  var dir = outputPath() + lowercasePluralName

  const data = fs.readFileSync(templatesPath + fileName, 'utf8')
  const finalDataNoForm = decodeTemplate(data, schema, allSchemas)
  var finalData = populatedDataWithFormFields(
    finalDataNoForm,
    allSchemas,
    fields,
    viewMapData,
    viewKeyword,
    formType,
    skipNonEditableFields,
  )
  if (titleFieldKey && finalData && finalData.indexOf('titleFieldKey') != -1) {
    finalData = finalData.split('titleFieldKey').join(titleFieldKey)
  }

  const filePath = dir + '/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })
}

module.exports = {
  generateViewFile,
}
