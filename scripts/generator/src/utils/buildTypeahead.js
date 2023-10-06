var fs = require('fs')
var { outputPath, templatesPath } = require('../config')
var { decodeData } = require('./decodeData')

function buildTypeahead(
  mutableOriginalData,
  allSchemas,
  field,
  fieldName,
  formType,
) {
  const foreignKey = field.foreignKey
  const foreignField = allSchemas[foreignKey]
  const typeaheadRenderers = field.typeaheadRenderers

  // For typeahead/foreign keys in forms, we first generate a typeahead class
  var dir = outputPath()

  var decode = {}
  decode['$className$'] = () => field.cellClassName
  decode['$lowercaseplural$'] = () => foreignField.lowercasePluralName
  decode['$lowercasesingular$'] = () => foreignField.singularName
  decode['$capitalcasePluralDisplay$'] = () => foreignField.lowercasePluralName
  decode['$capitalcaseplural$'] = () =>
    foreignField.lowercasePluralName.charAt(0).toUpperCase() +
    foreignField.lowercasePluralName.slice(1)

  decode['$originalDataFormatter$'] = () =>
    typeaheadRenderers.originalDataFormatter
  decode['$dataItemRenderer$'] = () => typeaheadRenderers.dataItemRenderer

  const data = fs.readFileSync(
    templatesPath + 'ui/TypeaheadComponent.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = field.cellClassName + 'TypeaheadComponent'
  const fileName = className + '.js'
  const filePath = dir + 'ui/' + fileName
  console.log('Generating typeahead class' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that class into the form code file
  const importsIndicator = '/* Insert extra imports here */'
  var insertionIndex = mutableOriginalData.indexOf(importsIndicator)

  const prefix = formType === 'add' ? '' : '../'
  const importData =
    '\nimport ' + className + " from '" + prefix + '../ui/' + fileName + "'\n"

  var outputData = mutableOriginalData
  if (insertionIndex !== -1) {
    insertionIndex = insertionIndex + importsIndicator.length
    outputData = [
      outputData.slice(0, insertionIndex),
      importData,
      outputData.slice(insertionIndex),
    ].join('')
  }

  // Then we add the typeahead field to the form
  const formData = `
          <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
              <label className={\`\${styles.FormLabel} FormLabel\`}>${field.displayName}</label>
              <${className} onSelect={(value) => onTypeaheadSelect(value, "${fieldName}")} id={originalData && originalData.${fieldName}} name={originalData && originalData.${fieldName}} />
          </div>
      `

  return {
    originalData: outputData,
    formData: formData,
  }
}

module.exports = { buildTypeahead }
