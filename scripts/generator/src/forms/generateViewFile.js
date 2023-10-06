var { templatesPath, outputPath } = require('../config')

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
    fields,
    viewMapData,
    viewKeyword,
    formType,
    skipNonEditableFields,
  )
  if (titleFieldKey && finalData && finalData.indexOf('titleFieldKey') != -1) {
    finalData = finalData.split('titleFieldKey').join(titleFieldKey)
  }

  // If we have non-modifiable data, we insert its initialization code
  const nonmodifieableKeyword =
    '/* Insert non modifiable initialization data here */'
  const nonmodifieableIndex = finalData.indexOf(nonmodifieableKeyword)
  if (nonmodifieableIndex != -1) {
    const nonmodifiableTypes = [
      'photo',
      'photos',
      'multimedia',
      'multimedias',
      'location',
      'simpleLocation',
      'date',
      'object',
      'array',
      'enum',
      'colors',
      'color',
      'address',
      'boolean',
      'code',
    ]
    // const nonmodifiableTypes = ["photo", "photos", "location", "date","object", "array", "enum", "colors","color"]
    const nonmodifiableDateTemplateData = `
          if (originalData.user && Date.parse(originalData.user)) {
              nonFormData['user'] = new Date(originalData.user)
          }
          `

    const nonmodifiableTemplateData = `
          if (originalData.user) {
              nonFormData['user'] = originalData.user
          }
          `
    var nonmodifiableData = ''
    Object.keys(fields).forEach(function (fieldName) {
      const field = fields[fieldName]
      const type = field.type
      if (nonmodifiableTypes.indexOf(type) != -1) {
        const data =
          type == 'date'
            ? nonmodifiableDateTemplateData
            : nonmodifiableTemplateData
        const chunkOutputData = decodeTemplate(data, schema, allSchemas)
        nonmodifiableData = nonmodifiableData + chunkOutputData
      }
    })

    const insertionIndex = nonmodifieableIndex + nonmodifieableKeyword.length
    finalData = [
      finalData.slice(0, insertionIndex),
      nonmodifiableData,
      finalData.slice(insertionIndex),
    ].join('')
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
