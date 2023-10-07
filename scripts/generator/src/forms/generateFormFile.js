var { decodeTemplate, decodeFieldTemplate } = require('../utils/decodeTemplate')

var { outputPath, templatesPath } = require('../config')
var { populatedDataWithFormFields } = require('./populatedDataWithFormFields')

var fs = require('fs')

function populatedDataWithFormErrors(
  originalData,
  allSchemas,
  fields,
  dataMap,
  keyword,
  skipNonEditableFields = false,
) {
  var mutableOriginalData = originalData
  var allErrors = new Array()
  Object.keys(fields).forEach(function (fieldName) {
    var field = fields[fieldName]
    var templateData = dataMap[field.type]
    templateData = decodeFieldTemplate(
      templateData,
      allSchemas,
      field.displayName,
      fieldName,
    )
    if (field.required === true) {
      if (
        (field.editable === false && skipNonEditableFields === true) ||
        field.type === 'boolean'
      ) {
        return
      }
      var errRequired = decodeFieldTemplate(
        dataMap.required,
        allSchemas,
        field.displayName,
        fieldName,
      )
      allErrors.push(errRequired)
    }
    if (templateData) {
      allErrors.push(templateData)
    }
  })

  allErrors = allErrors.reverse()
  const insertionIndex = mutableOriginalData.indexOf(keyword) + keyword.length
  console.log(keyword)
  console.log(insertionIndex)
  var outputData = mutableOriginalData
  for (var i = 0; i < allErrors.length; ++i) {
    outputData = [
      outputData.slice(0, insertionIndex),
      allErrors[i],
      outputData.slice(insertionIndex),
    ].join('')
  }

  return outputData
}

function generateFormFile(
  fileName,
  formType,
  schema,
  allSchemas,
  formMapData,
  formKeyword,
  skipNonEditableFields,
) {
  const {
    fields,
    displayName,
    lowercaseSingularName,
    lowercasePluralName,
    titleFieldKey,
    singularCapitalName,
  } = schema
  var dir = outputPath() + lowercasePluralName

  const data = fs.readFileSync(templatesPath + fileName, 'utf8')
  const finalDataNoForm = decodeTemplate(data, schema, allSchemas)
  const finalDataNoErr = populatedDataWithFormFields(
    finalDataNoForm,
    allSchemas,
    fields,
    formMapData,
    formKeyword,
    formType,
    skipNonEditableFields,
  )

  var {
    errFormTemplateData,
    errFormKeyword,
  } = require('./templates/errorFormData')

  var finalData = populatedDataWithFormErrors(
    finalDataNoErr,
    allSchemas,
    fields,
    errFormTemplateData,
    errFormKeyword,
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
      'markdown',
    ]
    const nonmodifiableDateTemplateData = `
          if (originalData.user && Date.parse(originalData.user)) {
              nonFormData['user'] = new Date(originalData.user)
          }
          `

    const nonmodifiableCodeTemplateData = `
          if (originalData.user) {
              nonFormData['user'] =  beautify_html(originalData.user, { indent_size: 2 })
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
            : type === 'code'
            ? nonmodifiableCodeTemplateData
            : nonmodifiableTemplateData
        const chunkOutputData = decodeFieldTemplate(
          data,
          allSchemas,
          field.displayName,
          fieldName,
        )
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
  generateFormFile,
}
