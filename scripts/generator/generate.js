'use strict'

/*
to use this project, run "node generate.js plugin_name"
*/
var fs = require('fs')

var myArgs = process.argv.slice(2)
const schema = require('./schemas/' + myArgs[0])
var schemaKey = myArgs[1]

var outputPath = '../client/src/admin/generated/'
var templatesPath = './templates/'

var nodeAPIOutputPath = '../api/controllers/generated/'

function decodeData(data, transformations) {
  var output = data
  Object.keys(transformations).forEach(function (keyword) {
    output = output && output.split(keyword).join(transformations[keyword]())
  })
  return output
}

function typeaheadBuilder(mutableOriginalData, field, fieldName, formType) {
  const foreignKey = field.foreignKey
  const foreignField = schema[foreignKey]
  const typeaheadRenderers = field.typeaheadRenderers

  // For typeahead/foreign keys in forms, we first generate a typeahead class
  var dir = outputPath

  var decode = {}
  decode['$className$'] = () => field.cellClassName
  decode['$lowercaseplural$'] = () => foreignField.pluralName
  decode['$lowercasesingular$'] = () => foreignField.singularName
  decode['$capitalcaseplural$'] = () =>
    foreignField.pluralName.charAt(0).toUpperCase() +
    foreignField.pluralName.slice(1)

  decode['$originalDataFormatter$'] = () =>
    typeaheadRenderers.originalDataFormatter
  decode['$dataItemRenderer$'] = () => typeaheadRenderers.dataItemRenderer

  const data = fs.readFileSync(
    templatesPath + 'ui/IMTypeaheadComponent.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = 'IM' + field.cellClassName + 'TypeaheadComponent'
  const fileName = className + '.js'
  const filePath = dir + 'ui/' + fileName
  console.log('Generating ' + filePath)
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
        <div className="FormFieldContainer">
            <label className="FormLabel">${field.displayName}</label>
            <${className} onSelect={(value) => onTypeaheadSelect(value, "${fieldName}")} id={originalData && originalData.${fieldName}} name={originalData && originalData.${fieldName}} />
        </div>
    `

  return {
    originalData: outputData,
    formData: formData,
  }
}

function multipleTypeaheadBuilder(
  mutableOriginalData,
  field,
  fieldName,
  formType,
) {
  const foreignKeys = field.foreignKeys ? field.foreignKeys : field.foreignKey
  const foreignField = schema[foreignKeys]
  const typeaheadRenderers = field.typeaheadRenderers

  // For typeahead/foreign keys in forms, we first generate a typeahead class
  var dir = outputPath

  var decode = {}
  decode['$className$'] = () => field.cellClassName
  decode['$lowercaseplural$'] = () => foreignField.pluralName
  decode['$lowercasesingular$'] = () => foreignField.singularName
  decode['$capitalcaseplural$'] = () =>
    foreignField.pluralName.charAt(0).toUpperCase() +
    foreignField.pluralName.slice(1)

  decode['$originalDataFormatter$'] = () =>
    typeaheadRenderers.originalDataFormatter
  decode['$dataItemRenderer$'] = () => typeaheadRenderers.dataItemRenderer

  const data = fs.readFileSync(
    templatesPath + 'ui/IMMultipleTypeaheadComponent.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = 'IM' + field.cellClassName + 'MultipleTypeaheadComponent'
  const fileName = className + '.js'
  const filePath = dir + 'ui/' + fileName
  console.log('Generating ' + filePath)
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
        <div className="FormFieldContainer">
            <label className="FormLabel">${field.displayName}</label>
            <${className} onSelect={(value) => onMultipleTypeaheadSelect(value, "${fieldName}")} onDelete={(index) => onMultipleTypeaheadDelete(index, "${fieldName}")} data={modifiedNonFormData.${fieldName}} name={"${fieldName}"} />
        </div>
    `

  return {
    originalData: outputData,
    formData: formData,
  }
}

function multipleTypeaheadIdBuilder(mutableOriginalData, field, fieldName) {
  const foreignKeys = field.foreignKeys ? field.foreignKeys : field.foreignKey
  const foreignField = schema[foreignKeys]
  const typeaheadRenderers = field.typeaheadRenderers

  // For typeahead/foreign keys in forms, we first generate a typeahead class
  var dir = outputPath

  var decode = {}
  decode['$className$'] = () => field.cellClassName
  decode['$lowercaseplural$'] = () => foreignField.pluralName
  decode['$lowercasesingular$'] = () => foreignField.singularName
  decode['$capitalcaseplural$'] = () =>
    foreignField.pluralName.charAt(0).toUpperCase() +
    foreignField.pluralName.slice(1)

  decode['$originalDataFormatter$'] = () =>
    typeaheadRenderers.originalDataFormatter
  decode['$dataItemRenderer$'] = () => typeaheadRenderers.dataItemRenderer

  const data = fs.readFileSync(
    templatesPath + 'ui/IMMultipleTypeaheadIdComponent.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = 'IM' + field.cellClassName + 'MultipleTypeaheadIdComponent'
  const fileName = className + '.js'
  const filePath = dir + 'ui/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that class into the form code file
  const importsIndicator = '/* Insert extra imports here */'
  var insertionIndex = mutableOriginalData.indexOf(importsIndicator)
  const importData =
    '\nimport ' + className + " from '../ui/" + fileName + "'\n"

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
        <div className="FormFieldContainer">
            <label className="FormLabel">${field.displayName}</label>
            <${className} onSelect={(value) => onMultipleTypeaheadSelect(value, "${fieldName}")} onDelete={(index) => onMultipleTypeaheadDelete(index, "${fieldName}")} ids={modifiedNonFormData.${fieldName}} name={"${fieldName}"} />
        </div>
    `

  return {
    originalData: outputData,
    formData: formData,
  }
}

function foreignKeysArrayTableCellBuilder(
  itemRendererString,
  fieldName,
  apiRoute,
  field,
  listTemplateData,
) {
  // For array data types, we first generate a custom cell for tables
  var dir = outputPath

  var decode = {}
  decode['$capitalcase$'] = () => field.cellClassName
  decode['$lowercase$'] = () => fieldName
  decode['$targetData$'] = () => field.foreignKeys
  decode['$dataItemRenderer$'] = () => itemRendererString
  decode['$apiRouteName$'] = () => apiRoute

  const data = fs.readFileSync(
    templatesPath + 'customTableCells/IMForeignKeysArrayTableCell.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = 'IM' + field.cellClassName + 'ForeignKeysArrayTableCell'
  const fileName = className + '.js'
  const filePath = dir + 'tableCells/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)
  const importData =
    '\nimport ' + className + " from '../tableCells/" + fileName + "'\n"

  var outputData = listTemplateData
  if (insertionIndex !== -1) {
    insertionIndex = insertionIndex + importsIndicator.length
    outputData = [
      listTemplateData.slice(0, insertionIndex),
      importData,
      listTemplateData.slice(insertionIndex),
    ].join('')
  }

  // Then we use that custom class to render the table cells in the list view
  const columnString = `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <${className} ${fieldName}Array={data.value} />
        )
    },`

  return {
    columnString,
    templateData: outputData,
  }
}

function foreignKeysArrayIdTableCellBuilder(
  itemRendererString,
  fieldName,
  apiRoute,
  field,
  listTemplateData,
) {
  // For array data types, we first generate a custom cell for tables
  var dir = outputPath

  var decode = {}
  decode['$capitalcase$'] = () => field.cellClassName
  decode['$lowercase$'] = () => fieldName
  decode['$targetData$'] = () => field.foreignKeys
  decode['$dataItemRenderer$'] = () => itemRendererString
  decode['$apiRouteName$'] = () => apiRoute

  const data = fs.readFileSync(
    templatesPath + 'customTableCells/IMForeignKeysArrayIdTableCell.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = 'IM' + field.cellClassName + 'ForeignKeysArrayIdTableCell'
  const fileName = className + '.js'
  const filePath = dir + 'tableCells/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)
  const importData =
    '\nimport ' + className + " from '../tableCells/" + fileName + "'\n"

  var outputData = listTemplateData
  if (insertionIndex !== -1) {
    insertionIndex = insertionIndex + importsIndicator.length
    outputData = [
      listTemplateData.slice(0, insertionIndex),
      importData,
      listTemplateData.slice(insertionIndex),
    ].join('')
  }

  // Then we use that custom class to render the table cells in the list view
  const columnString = `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <${className} ${fieldName}Array={data.value} />
        )
    },`

  return {
    columnString,
    templateData: outputData,
  }
}

function arrayTableCellBuilder(
  itemRendererString,
  fieldName,
  field,
  listTemplateData,
) {
  // For array data types, we first generate a custom cell for tables
  var dir = outputPath

  var decode = {}
  decode['$capitalcase$'] = () => field.cellClassName
  decode['$lowercase$'] = () => fieldName
  decode['$dataItemRenderer$'] = () => itemRendererString

  const data = fs.readFileSync(
    templatesPath + 'customTableCells/IMArrayTableCell.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = 'IM' + field.cellClassName + 'ArrayTableCell'
  const fileName = className + '.js'
  const filePath = dir + 'tableCells/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)
  const importData =
    '\nimport ' + className + " from '../tableCells/" + fileName + "'\n"

  var outputData = listTemplateData
  if (insertionIndex !== -1) {
    insertionIndex = insertionIndex + importsIndicator.length
    outputData = [
      listTemplateData.slice(0, insertionIndex),
      importData,
      listTemplateData.slice(insertionIndex),
    ].join('')
  }

  // Then we use that custom class to render the table cells in the list view
  const columnString = `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <${className} ${fieldName}Array={data.value} />
        )
    },`

  return {
    columnString,
    templateData: outputData,
  }
}

function objectTableCellBuilder(
  itemRendererString,
  fieldName,
  field,
  listTemplateData,
) {
  /// In case we need custom object
  // For object data types, we first generate a custom cell for tables
  var dir = outputPath

  var decode = {}
  decode['$capitalcase$'] = () => field.cellClassName
  decode['$lowercase$'] = () => fieldName
  decode['$dataItemRenderer$'] = () => itemRendererString

  const data = fs.readFileSync(
    templatesPath + 'customTableCells/IMObjectTableCell.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = 'IM' + field.cellClassName + 'ObjectTableCell'
  const fileName = className + '.js'
  const filePath = dir + 'tableCells/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)
  const importData =
    '\nimport ' + className + " from '../tableCells/" + fileName + "'\n"

  var outputData = listTemplateData
  if (insertionIndex !== -1) {
    insertionIndex = insertionIndex + importsIndicator.length
    outputData = [
      listTemplateData.slice(0, insertionIndex),
      importData,
      listTemplateData.slice(insertionIndex),
    ].join('')
  }

  // Then we use that custom class to render the table cells in the list view
  const columnString = `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <${className} ${fieldName}Object={data.value} />
        )
    },`

  return {
    columnString,
    templateData: outputData,
  }
}

function columnsStringBuilder(fields, listTemplateData) {
  var columnsString = ''
  var outputListTemplateData = listTemplateData

  Object.keys(fields).forEach(function (fieldName) {
    var field = fields[fieldName]
    if (field.type === 'photo') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMImagesTableCell singleImageURL={data.value} />
        )
    },`
    } else if (field.type == 'photos') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMImagesTableCell imageURLs={data.value} />
        )
    },`
    } else if (field.type === 'multimedia') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMMultimediaTableCell singleMultimediaURL={data.value} />
        )
    },`
    } else if (field.type === 'multimedias') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMMultimediaTableCell multimediaURLs={data.value} />
        )
    },`
    } else if (field.type == 'boolean') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMToggleSwitchComponent isChecked={data.value} disabled />
        )
    },`
    } else if (field.type == 'color') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMColorBoxComponent color={data.value} />
        )
    },`
    } else if (field.type == 'colors') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMColorsTableCell data={data.value} />
        )
    },`
    } else if (field.type == 'object') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMObjectTableCell data={data.value} />
        )
    },`
    } else if (field.type == 'array' && field.foreignKeys) {
      if (field.subtype === 'ids') {
        const builder = foreignKeysArrayIdTableCellBuilder(
          schema.mapRenderers[fieldName],
          fieldName,
          schema[field.foreignKeys].singularName,
          field,
          outputListTemplateData,
        )
        columnsString = columnsString + builder.columnString
        outputListTemplateData = builder.templateData
      } else if (field.subtype === 'objects') {
        const builder = foreignKeysArrayTableCellBuilder(
          schema.mapRenderers[fieldName],
          fieldName,
          schema[field.foreignKeys].singularName,
          field,
          outputListTemplateData,
        )
        columnsString = columnsString + builder.columnString
        outputListTemplateData = builder.templateData
      }
    } else if (field.type == 'array') {
      const builder = arrayTableCellBuilder(
        schema.mapRenderers[fieldName],
        fieldName,
        field,
        outputListTemplateData,
      )
      columnsString = columnsString + builder.columnString
      outputListTemplateData = builder.templateData
    } else if (field.type == 'object') {
      ///In case we ever want to add custom objects
      const builder = objectTableCellBuilder(
        schema.mapRenderers[fieldName],
        fieldName,
        field,
        outputListTemplateData,
      )
      columnsString = columnsString + builder.columnString
      outputListTemplateData = builder.templateData
    } else if (field.type == 'date') {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMDateTableCell date={data.value} />
        )
    },`
    } else if (field.foreignKey) {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMForeignKeyTableCell id={data.value} apiRouteName="${
              schema[field.foreignKey].pluralName
            }" titleKey="${schema[field.foreignKey].titleFieldKey}" />
        )
    },`
    } else if (field.type == 'location') {
      columnsString =
        columnsString +
        `
        {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMLocationTableCell data={data.value} />
        )
        },`
    } else if (field.type == 'simpleLocation') {
      columnsString =
        columnsString +
        `
        {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMSimpleLocationTableCell data={data.value} />
        )
        },`
    } else if (field.type == 'address') {
      columnsString =
        columnsString +
        `
        {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <IMAddressTableCell data={data.value} />
        )
        },`
    } else if (field.type == 'code') {
      columnsString =
        columnsString +
        `
        {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
        Cell: data => (
            <div className='codeEditor'>{data?.value && data.value.substring(0, 100)}...</div>
        )
        },`
    } else if (field.type == 'markdown') {
      columnsString =
        columnsString +
        `
          {
          Header: "${field.displayName || fieldName}",
          accessor: "${fieldName}",
          Cell: data => (
              <div className='markdownReadOnly'>{data?.value && data.value.substring(0, 100)}...</div>
          )
          },`
    } else {
      columnsString =
        columnsString +
        `
    {
        Header: "${field.displayName || fieldName}",
        accessor: "${fieldName}",
    },`
    }
  })

  return {
    columnsString,
    templateData: outputListTemplateData,
  }
}

function decodeTemplate(
  template,
  displayName,
  singularName,
  pluralName,
  tableName,
  fields,
  singularCapitalName = displayName,
  extraQueryParams = null,
) {
  // order is important here:
  var keywords = [
    '"users"',
    'Users',
    'User',
    'users',
    'user',
    '$columns$',
    '$extraQueryParams$',
  ]

  var decode = {}
  decode['"users"'] = () => '"' + tableName + '"'
  decode['User'] = () => singularCapitalName
  decode['Users'] = () =>
    displayName
      ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
      : 'Users'
  decode['user'] = () => singularName
  decode['users'] = () => pluralName
  decode['$columns$'] = template => {
    return columnsStringBuilder(fields, template)
  }
  decode['$extraQueryParams$'] = () =>
    extraQueryParams ? `"${extraQueryParams}"` : 'null'

  var output = template
  keywords.forEach(keyword => {
    // output = output.replace(new RegExp(keyword, 'g'), decode[keyword]())
    if (keyword == '$columns$') {
      // if the keyword modifies the underlying data, we need to make sure we keep those alterations
      const builder = decode[keyword](output)
      output = builder.templateData
      output = output && output.split(keyword).join(builder.columnsString)
    } else {
      output = output && output.split(keyword).join(decode[keyword]())
    }
  })

  return output
}

function generateFile(
  fileName,
  tableName,
  fields,
  displayName,
  singularName,
  pluralName,
  singularCapitalName,
  extraQueryParams = null,
) {
  var dir = outputPath + pluralName

  const data = fs.readFileSync(templatesPath + fileName, 'utf8')
  const finalData = decodeTemplate(
    data,
    displayName,
    singularName,
    pluralName,
    tableName,
    fields,
    singularCapitalName,
    extraQueryParams,
  )

  const filePath = dir + '/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })
}

function generateFormFile(
  fileName,
  formType,
  schema,
  formMapData,
  formKeyword,
  skipNonEditableFields,
) {
  const {
    fields,
    displayName,
    singularName,
    pluralName,
    titleFieldKey,
    singularCapitalName,
  } = schema
  var dir = outputPath + pluralName

  const data = fs.readFileSync(templatesPath + fileName, 'utf8')
  const finalDataNoForm = decodeTemplate(
    data,
    displayName,
    singularName,
    pluralName,
    pluralName,
    fields,
    singularCapitalName,
  )
  const finalDataNoErr = populatedDataWithFormFields(
    finalDataNoForm,
    fields,
    formMapData,
    formKeyword,
    formType,
    skipNonEditableFields,
  )
  var finalData = populatedDataWithFormErrors(
    finalDataNoErr,
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
        const chunkOutputData = decodeTemplate(
          data,
          field.displayName,
          fieldName,
          fieldName,
          fieldName,
          [],
          singularCapitalName,
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

function generateViewFile(
  fileName,
  formType,
  schema,
  viewMapData,
  viewKeyword,
  skipNonEditableFields,
) {
  const {
    fields,
    displayName,
    singularName,
    pluralName,
    titleFieldKey,
    singularCapitalName,
  } = schema
  var dir = outputPath + pluralName

  const data = fs.readFileSync(templatesPath + fileName, 'utf8')
  const finalDataNoForm = decodeTemplate(
    data,
    displayName,
    singularName,
    pluralName,
    pluralName,
    fields,
    singularCapitalName,
  )
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
        const chunkOutputData = decodeTemplate(
          data,
          field.displayName,
          fieldName,
          fieldName,
          fieldName,
          [],
          singularCapitalName,
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

function generateController(
  tableName,
  fields,
  displayName,
  singularName,
  pluralName,
  singularCapitalName,
) {
  const controllerOutputPath =
    nodeAPIOutputPath + singularCapitalName + 'Controller.js'

  const data = fs.readFileSync(templatesPath + 'UserController.js', 'utf8')
  const finalData = decodeTemplate(
    data,
    null,
    singularName,
    pluralName,
    tableName,
    fields,
    singularCapitalName,
  )

  console.log('Generating ' + controllerOutputPath)
  fs.writeFile(controllerOutputPath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + controllerOutputPath)
  })
}

function generateAPIRoutes(schema) {
  console.log('Writing the API routes')

  const apiRoutesJSPath = '../api/apiRoutes.js'
  const indicatorKeyword = 'Insert more API routes here'
  const data = fs.readFileSync(apiRoutesJSPath, 'utf8')

  const templateData =
    "\n\n\
    // Users Routes\n\
    var userController = require('./controllers/generated/UserController')\n\
    app.route('/api/users')\n\
        .get(requestAuth, (req, res) => { userController.list(req, res, db) })\n\
\n\
    app.route('/api/user/:userId')\n\
        .get( (req, res) => {userController.fetchUser(req, res, db) })\n\
        .put( (req, res) => {userController.updateUser(req, res, db) })\n\
        .delete((req, res) => { userController.deleteUser(req, res, db) })\n\
\n\
    app.route('/api/user/add')\n\
        .post( (req, res) => { userController.createNewUser(req, res, db) })"

  const finalData = decodeTemplate(
    templateData,
    null,
    schema.singularName,
    schema.pluralName,
    schema.tableName,
    schema.fields,
    schema.singularCapitalName,
  )
  const insertionIndex =
    data.indexOf(indicatorKeyword) + indicatorKeyword.length

  var outputData = [
    data.slice(0, insertionIndex),
    finalData + '\n',
    data.slice(insertionIndex),
  ].join('')

  fs.writeFile(apiRoutesJSPath, outputData, function (err) {
    if (err) return console.log(err)
    console.log('Generated the API routes at ' + apiRoutesJSPath)
  })
}

function generateHTTPRoutes(schema) {
  console.log('Generating the HTTP routes')
  const routesKeyword = '{/* Insert more CRUD routes here */}'
  const importKeyword = 'Insert more CRUD imports here'
  const adminViewJSPath = '../client/src/admin/ui/AdminView.js'

  const data = fs.readFileSync(adminViewJSPath, 'utf8')

  const importData =
    "\nimport { UsersListView, UpdateUserView, AddNewUserView, DetailedUserView } from '../generated/users';\n"
  const finalImportData = decodeTemplate(
    importData,
    schema.displayName,
    schema.singularName,
    schema.pluralName,
    schema.tableName,
    schema.fields,
    schema.singularCapitalName,
  )
  const importInsertionIndex =
    data.indexOf(importKeyword) + importKeyword.length
  const outputDataAfterAddingImports = [
    data.slice(0, importInsertionIndex),
    finalImportData,
    data.slice(importInsertionIndex),
  ].join('')

  const httpRoutesData =
    '\n\n\
                <Route path="/admin/users">\n\
                    <UsersListView />\n\
                </Route>\n\
                <Route path="/admin/user/:userId/update">\n\
                    <UpdateUserView />\n\
                </Route>\n\
                <Route path="/admin/user/:userId/view">\n\
                    <DetailedUserView />\n\
                </Route>\n\
                <Route path="/admin/user/add">\n\
                    <AddNewUserView />\n\
                </Route>\n'

  const finalHttpRoutesData = decodeTemplate(
    httpRoutesData,
    schema.displayName,
    schema.singularName,
    schema.pluralName,
    schema.tableName,
    schema.fields,
    schema.singularCapitalName,
  )
  const httpRoutesInsertionIndex =
    outputDataAfterAddingImports.indexOf(routesKeyword) + routesKeyword.length
  const outputDataAfterAddingImportsAndRoutes = [
    outputDataAfterAddingImports.slice(0, httpRoutesInsertionIndex),
    finalHttpRoutesData,
    outputDataAfterAddingImports.slice(httpRoutesInsertionIndex),
  ].join('')

  fs.writeFile(
    adminViewJSPath,
    outputDataAfterAddingImportsAndRoutes,
    function (err) {
      if (err) return console.log(err)
      console.log('Generated the http routes at ' + adminViewJSPath)
    },
  )
}

function generateMenuItems(schema) {
  console.log('Writing the API routes')

  const menuFileJSPath = '../client/src/admin/ui/Menu.js'
  const indicatorKeyword = '// Insert more menu items here'
  const data = fs.readFileSync(menuFileJSPath, 'utf8')

  const templateData =
    '\n\
            {\n\
                title: "Users",\n\
                path: "users",\n\
                subItems: []\n\
            },'

  const finalData = decodeTemplate(
    templateData,
    schema.displayName,
    schema.singularName,
    schema.pluralName,
    schema.pluralName,
    schema.fields,
    schema.singularCapitalName,
  )
  const insertionIndex =
    data.indexOf(indicatorKeyword) + indicatorKeyword.length

  var outputData = [
    data.slice(0, insertionIndex),
    finalData,
    data.slice(insertionIndex),
  ].join('')

  fs.writeFile(menuFileJSPath, outputData, function (err) {
    if (err) return console.log(err)
    console.log('Generated the menu items at ' + menuFileJSPath)
  })
}

function generateScaffold(schema) {
  const {
    tableName,
    fields,
    displayName,
    singularName,
    pluralName,
    singularCapitalName,
    orderBy,
  } = schema

  const dir = outputPath + pluralName

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    fs.mkdirSync(dir + '/update')
  }

  // REACT - CLIENT CODE

  // Generate CRUD files
  generateFormFile(
    'add.tsx',
    'add',
    schema,
    addFormTemplateDataByType,
    addFormKeyword,
    true,
  )
  generateFile(
    'index.tsx',
    pluralName,
    fields,
    displayName,
    singularName,
    pluralName,
    singularCapitalName,
  )
  if (orderBy) {
    const { field, desc } = orderBy
    var orderByStr = '?orderBy=' + field
    if (desc) {
      orderByStr += '&desc=true'
    }
    generateFile(
      'list.tsx',
      pluralName,
      fields,
      displayName,
      singularName,
      pluralName,
      singularCapitalName,
      orderByStr,
    )
  } else {
    generateFile(
      'list.tsx',
      pluralName,
      fields,
      displayName,
      singularName,
      pluralName,
      singularCapitalName,
    )
  }
  generateFormFile(
    'update/[id].tsx',
    'update',
    schema,
    editFormTemplateDataByType,
    editFormKeyword,
  )
  generateViewFile(
    '[id].tsx',
    'view',
    schema,
    viewFormTemplateDataByType,
    viewFormKeyword,
  )

  // Generate admin view http routes
  generateHTTPRoutes(schema)
  // Generate the menu items for the admin left menu panel
  generateMenuItems(schema)

  // NODE - API Code

  // Controller
  generateController(
    tableName,
    fields,
    displayName,
    singularName,
    pluralName,
    singularCapitalName,
  )
  // add API routes
  generateAPIRoutes(schema)
}

const addFormKeyword = '{/* Insert all add form fields here */}'
const addFormTemplateDataByType = {
  string: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <input
                            className="FormTextField"
                            type="user"
                            name="user"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.user}
                        />
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  boolean: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <IMToggleSwitchComponent isChecked={modifiedNonFormData.user} onSwitchChange={() => handleSwitchChange(modifiedNonFormData["user"], "user")} />
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  photo: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && (
                            <IMPhoto openable dismissable className="photo" src={modifiedNonFormData.user} onDelete={(src) => handleDeletePhoto(src, "user", false) } />
                        )}
                        <input className="FormFileField" id="user" name="user" type="file" onChange={(event) => {
                            handleImageUpload(event, "user", false);
                        }} />
                    </div>
    `,
  photos: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && modifiedNonFormData.user.map((url) =>
                            <IMPhoto openable dismissable className="photo" src={url} onDelete={(src) => handleDeletePhoto(src, "user", true) } />
                        )}
                        <input className="FormFileField" multiple id="user" name="user" type="file" onChange={(event) => {
                            handleImageUpload(event, "user", true);
                        }} />
                    </div>
    `,
  multimedia: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && (
                            <IMMultimediaComponent 
                                openable 
                                dismissable 
                                className="multimedia" 
                                src={modifiedNonFormData.user} 
                                onDelete={(src) => handleMultimediaDelete(src, "user", false) } 
                            />
                        )}
                        <input className="FormFileField" id="user" name="user" type="file" onChange={(event) => {
                            handleMultimediaUpload(event, "user", false);
                        }} />
                    </div>
    `,
  multimedias: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && modifiedNonFormData.user.map( (data) => 
                            <IMMultimediaComponent 
                                openable 
                                dismissable 
                                className="multimedia" 
                                src={data.url} 
                                type={data.mime} 
                                onDelete={(src) => handleMultimediaDelete(src, "user", true) } 
                            />
                        )}
                        <input className="FormFileField" multiple id="user" name="user" type="file" onChange={(event) => {
                            handleMultimediaUpload(event, "user", true);
                        }} />
                    </div>
    `,
  date: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <IMDatePicker
                            selected={modifiedNonFormData.user}
                            onChange={(toDate) => onDateChange(toDate, "user")}
                        />
                    </div>
    `,
  location: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <IMLocationPicker
                            initialValue={modifiedNonFormData.user && modifiedNonFormData.user.address}
                            onLocationChange={(addressObject) => onLocationChange(addressObject, "user")}                    
                        />
                    </div>
    `,
  simpleLocation: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <span style={{verticalAlign: "top", display:'inline-block'}}>
                            <div style={{padding:'0px 0px 3px 20px'}}>
                                lat: {modifiedNonFormData.user && modifiedNonFormData.user.lat}<br/>
                                lng: {modifiedNonFormData.user && modifiedNonFormData.user.lng}<br/>
                            </div>
                            <IMLocationPicker
                                onLocationChange={(addressObject) => onSimpleLocationChange(addressObject, "user")}                    
                            />
                        </span>
                    </div>
    `,
  address: `
                <div className="FormFieldContainer">
                    <label className="FormLabel">User</label>
                    <div className="FormArrayField">
                        <IMObjectInputComponent 
                            nonModifiable 
                            keyPlaceholder="User Field" 
                            valuePlaceholer="User Value" 
                            handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                            handleDelete={(key) => handleObjectDelete(key, "user")} 
                            data={modifiedNonFormData["user"]} 
                            initialData={{address: "", city:"", zipCode:"",}}
                        />
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
                </div>
    `,
  color: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="colorField">
                            <IMColorBoxComponent color={modifiedNonFormData.user} handleDelete={() => handleColorDelete("user")}/>
                            <IMColorPicker 
                                onAccept={(color) => handleColorChange(color, "user")}
                                defaultColor='red'
                            />
                        </div>
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  colors: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="colorField">
                            <IMColorsContainer data={modifiedNonFormData.user} handleDelete={(index) => handleColorsDelete(index, "user")}/>
                            <IMColorPicker 
                                onAccept={(colors) => handleColorsChange(colors, "user")}
                                defaultColor='red'
                            />
                        </div>
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  array: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="FormArrayField">
                            <IMArrayInputComponent handleClick={(value) => handleArrayInput(value, "user")} handleDelete={(index) => handleArrayDelete(index, "user")} data={modifiedNonFormData["user"]}/>
                            <p className="ErrorMessage">
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  object: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="FormArrayField">
                            <IMObjectInputComponent 
                                keyPlaceholder="User Name" 
                                valuePlaceholder="User Value" 
                                handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                                handleDelete={(key) => handleObjectDelete(key, "user")} 
                                data={modifiedNonFormData["user"]}
                            />
                            <p className="ErrorMessage">
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  code: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <CodeMirror
                            className="editor FormTextField"
                            type="user"
                            value={modifiedNonFormData.user}
                            name="user"
                            options={{
                                theme: 'darcula',
                                lineNumbers: true,
                                mode: 'htmlmixed',
                            }}
                            onBeforeChange={(editor, data, value) => {
                                onCodeChange(value, 'user')
                            }}
                        />
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  markdown: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>

                        <div className="FormEditorContainer FormTextField">
                          <Editor
                            defaultValue={modifiedNonFormData.user}
                            onChange={value => {
                              onCodeChange(value(), 'user')
                            }}
                          />
                        </div>
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
}

const errFormKeyword = '/* Insert all form errors here */'
const errFormTemplateData = {
  string: '',
  photo: '',
  photos: '',
  date: '',
  location: '',
  simpleLocation: '',
  address: '',
  array: '',
  object: ``,
  boolean:
    "\n\
        if (values.user !== true && values.user !== false) {\n\
            errors.user = 'Field Required!'\n\
        }\n",
  color: '',
  colors: '',
  phone:
    "\n\
        if (!values.user.match(/^(?(d{3}))?[- ]?(d{3})[- ]?(d{4})$/)) {\n\
            errors.user = 'Invalid User!'\n\
        }\n",
  phoneNumber:
    "\n\
        if (!values.user.match(/^(?(d{3}))?[- ]?(d{3})[- ]?(d{4})$/)) {\n\
            errors.user = 'Invalid User!'\n\
        }\n",
  email:
    "\n\
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.user)) {\n\
            errors.user = 'Invalid User!'\n\
        }\n",
  required:
    "\n\
        if (!values.user) {\n\
            errors.user = 'Field Required!'\n\
        }\n",
}

const editFormKeyword = '{/* Insert all edit form fields here */}'
const editFormTemplateDataByType = {
  string: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <input
                            className="FormTextField"
                            type="user"
                            name="user"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.user}
                        />
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  boolean: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <IMToggleSwitchComponent isChecked={modifiedNonFormData.user} onSwitchChange={() => handleSwitchChange(modifiedNonFormData["user"], "user")} />
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  photo: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && (
                            <IMPhoto openable dismissable className="photo" src={modifiedNonFormData.user} onDelete={(src) => handleDeletePhoto(src, "user", false) } />
                        )}
                        <input className="FormFileField" id="user" name="user" type="file" onChange={(event) => {
                            handleImageUpload(event, "user", false);
                        }} />
                    </div>
    `,
  photos: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && modifiedNonFormData.user.map((url) =>
                            <IMPhoto openable dismissable className="photo" src={url} onDelete={(src) => handleDeletePhoto(src, "user", true) } />
                        )}
                        <input className="FormFileField" multiple id="user" name="user" type="file" onChange={(event) => {
                            handleImageUpload(event, "user", true);
                        }} />
                    </div>
    `,
  multimedia: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && (
                            <IMMultimediaComponent 
                                openable 
                                dismissable 
                                className="multimedia" 
                                src={modifiedNonFormData.user} 
                                onDelete={(src) => handleMultimediaDelete(src, "user", false) } 
                            />
                        )}
                        <input className="FormFileField" id="user" name="user" type="file" onChange={(event) => {
                            handleMultimediaUpload(event, "user", false);
                        }} />
                    </div>
    `,
  multimedias: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        {modifiedNonFormData.user && modifiedNonFormData.user.map( (data) => 
                            <IMMultimediaComponent 
                                openable 
                                dismissable 
                                className="multimedia" 
                                src={data.url} 
                                type={data.mime} 
                                onDelete={(src) => handleMultimediaDelete(src, "user", true) } 
                            />
                        )}
                        <input className="FormFileField" multiple id="user" name="user" type="file" onChange={(event) => {
                            handleMultimediaUpload(event, "user", true);
                        }} />
                    </div>
    `,
  date: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <IMDatePicker
                            selected={modifiedNonFormData.user}
                            onChange={(toDate) => onDateChange(toDate, "user")}
                        />
                    </div>
    `,
  location: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <IMLocationPicker
                            initialValue={modifiedNonFormData.user && modifiedNonFormData.user.address}
                            onLocationChange={(addressObject) => onLocationChange(addressObject, "user")}                    
                        />
                    </div>
    `,
  simpleLocation: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <span style={{verticalAlign: "top", display:'inline-block'}}>
                            <div style={{padding:'0px 0px 3px 20px'}}>
                                lat: {modifiedNonFormData.user && modifiedNonFormData.user.lat}<br/>
                                lng: {modifiedNonFormData.user && modifiedNonFormData.user.lng}<br/>
                            </div>
                            <IMLocationPicker
                                onLocationChange={(addressObject) => onSimpleLocationChange(addressObject, "user")}                    
                            />
                        </span>
                    </div>
    `,
  address: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="FormArrayField">
                            <IMObjectInputComponent 
                                keyPlaceholder="User Field" 
                                valuePlaceholder="User Value" 
                                handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                                handleDelete={(key) => handleObjectDelete(key, "user")} 
                                data={modifiedNonFormData["user"]}
                            />
                            <p className="ErrorMessage">
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  color: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="colorField">
                            <IMColorBoxComponent color={modifiedNonFormData.user} handleDelete={() => handleColorDelete("user")}/>
                            <IMColorPicker 
                                onAccept={(color) => handleColorChange(color, "user")}
                                defaultColor='red'
                            />
                        </div>
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  colors: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="colorField">
                            <IMColorsContainer data={modifiedNonFormData.user} handleDelete={(index) => handleColorsDelete(index, "user")}/>
                            <IMColorPicker 
                                onAccept={(colors) => handleColorsChange(colors, "user")}
                                defaultColor='red'
                            />
                        </div>
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  array: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="FormArrayField">
                            <IMArrayInputComponent handleClick={(value) => handleArrayInput(value, "user")} handleDelete={(index) => handleArrayDelete(index, "user")} data={modifiedNonFormData["user"]}/>
                            <p className="ErrorMessage">
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  object: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <div className="FormArrayField">
                            <IMObjectInputComponent 
                            keyPlaceholder="User Name" 
                            valuePlaceholder="User Value" 
                            handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                            handleDelete={(key) => handleObjectDelete(key, "user")} 
                            data={modifiedNonFormData["user"]}
                        />
                            <p className="ErrorMessage">
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  code: `
                    <div className="FormFieldContainer">
                        <label className="FormLabel">User</label>
                        <CodeMirror
                            className="editor FormTextField"
                            type="user"
                            value={modifiedNonFormData.user}
                            name="user"
                            options={{
                                theme: 'darcula',
                                lineNumbers: true,
                                mode: 'htmlmixed',
                            }}
                            onBeforeChange={(editor, data, value) => {
                                onCodeChange(value, 'user')
                            }}
                        />
                        <p className="ErrorMessage">
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  markdown: `
    <div className="FormFieldContainer">
        <label className="FormLabel">User</label>

        <div className="FormEditorContainer FormTextField">
          <Editor
            defaultValue={modifiedNonFormData.user}
            onChange={value => {
              onCodeChange(value(), 'user')
            }}
          />
        </div>
        <p className="ErrorMessage">
            {errors.user && touched.user && errors.user}
        </p>
    </div>
`,
}

const viewFormKeyword = '{/* Insert all view form fields here */}'
const viewFormTemplateDataByType = {
  string: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="LockedFieldValue">{originalData.user}</span>
            </div>
    `,
  boolean: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <IMToggleSwitchComponent isChecked={originalData.user} disabled />
            </div>
    `,
  photo: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                {originalData.user && (
                    <IMPhoto openable className="photo" src={originalData.user} />
                )}
            </div>
    `,
  photos: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                {originalData.user && originalData.user.map((url) =>
                    <IMPhoto openable className="photo" src={url} />
                )}
            </div>
    `,
  multimedia: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                {originalData.user && (
                    <IMMultimediaComponent 
                        openable 
                        className="multimedia" 
                        src={originalData.user} 
                    />
                )}
            </div>
    `,
  multimedias: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                {originalData.user && originalData.user.map((data) =>
                    <IMMultimediaComponent 
                        openable 
                        className="multimedia" 
                        src={data.url} 
                        type={data.mime} 
                    />
                )}
            </div>
    `,
  date: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="LockedFieldValue">{originalData.user && formatDate(originalData.user)}</span>
            </div>
    `,
  location: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                {originalData.user && originalData.user.address && (
                    <span className="LockedFieldValue">{originalData.user.address}</span>
                )}
            </div>
    `,
  simpleLocation: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                {originalData.user && (
                    <span className="LockedFieldValue" style={{verticalAlign: "bottom"}}>
                        lat: {originalData.user && originalData.user.lat}<br/>
                        lng: {originalData.user && originalData.user.lng}
                    </span>
                )}
            </div>
    `,
  address: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="FormArrayField">
                    { originalData.user && Object.keys(originalData.user).map( key => {
                        if(typeof originalData.user[key] === "string" || typeof originalData.user[key] === "number") {
                            return (<li>{key}: {originalData.user[key]}</li>)} 
                        }
                    )}
                </span>
            </div>
    `,
  color: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                { originalData.user && <IMColorBoxComponent color={originalData.user} /> }
            </div>
    `,
  colors: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                { originalData.user && originalData.user.map( myColor => <IMColorBoxComponent color={myColor} /> )}
            </div>
    `,
  array: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="FormArrayField">
                    { originalData.user && originalData.user.map( data => {
                        return (<li>{data}</li>)} 
                    )}
                </span>
            </div>
    `,
  object: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="FormArrayField">
                    { originalData.user && Object.keys(originalData.user).map( key => {
                        return (<li>{key}: {originalData.user[key]}</li>)} 
                    )}
                </span>
            </div>
    `,
  typeahead: (foreignKeySchema, displayName, fieldName) => `
             <div className="FormFieldContainer">
                <label className="FormLabel">${displayName}</label>
                <IMForeignKeyComponent id={originalData.${fieldName}} apiRouteName="${foreignKeySchema.singularName}" titleKey="${foreignKeySchema.titleFieldKey}" />
            </div>
    `,
  multiTypeaheadId: (foreignKeySchema, displayName, fieldName) => `
             <div className="FormFieldContainer">
                <label className="FormLabel">${displayName}</label>
                <IMForeignKeysIdComponent ids={originalData.${fieldName}} apiRouteName="${foreignKeySchema.singularName}" titleKey="${foreignKeySchema.titleFieldKey}" />
            </div>
    `,
  multiTypeahead: (foreignKeySchema, displayName, fieldName) => `
             <div className="FormFieldContainer">
                <label className="FormLabel">${displayName}</label>
                <IMForeignKeysComponent data={originalData.${fieldName}} apiRouteName="${foreignKeySchema.singularName}" titleKey="${foreignKeySchema.titleFieldKey}" />
            </div>
    `,
  code: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <CodeMirror
                  className="editor FormTextField"
                  type="user"
                  value={beautify_html(originalData.user, {
                    indent_size: 2,
                  })}
                  name="user"
                  options={{
                    theme: 'darcula',
                    lineNumbers: true,
                    mode: 'htmlmixed',
                    readonly: true,
                  }}
                />
            </div>
    `,
  markdown: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <div className="markdownEditorReadOnly FormTextField">
                  <Editor
                    defaultValue={originalData.user}
                    readOnly={true}
                  />
                </div>
            </div>
    `,
}

const nonEditableFormFieldTemplateData = `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="LockedFieldValue">{originalData && originalData.user}</span>
            </div>
`
function resolveObjectOfEnumFormField(field, fieldName, formType) {
  const enumValues = field.enum
  const enumValuesString = `'` + enumValues.join(`': "",'`) + `': "",`
  const templateDict = {
    view: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="FormArrayField">
                    { originalData.user && Object.keys(originalData.user).map( key => {
                        if(typeof originalData.user[key] === "string" || typeof originalData.user[key] === "number") {
                            return (<li>{key}: {originalData.user[key]}</li>)} 
                        }
                    )}
                </span>
            </div>
        `,
    update: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <div className="FormArrayField">
                    <IMObjectInputComponent 
                        nonModifiable
                        keyPlaceholder="User Field" 
                        valuePlaceholder="User Value" 
                        handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                        handleDelete={(key) => handleObjectDelete(key, "user")} 
                        data={modifiedNonFormData["user"]}
                    />
                    <p className="ErrorMessage">
                        {errors.user && touched.user && errors.user}
                    </p>
                </div>
            </div>
        `,
    add: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <div className="FormArrayField">
                    <IMObjectInputComponent 
                        nonModifiable 
                        keyPlaceholder="User Field" 
                        valuePlaceholer="User Value" 
                        handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                        handleDelete={(key) => handleObjectDelete(key, "user")} 
                        data={modifiedNonFormData["user"]} 
                        initialData={{${enumValuesString}}}
                    />
                    <p className="ErrorMessage">
                        {errors.user && touched.user && errors.user}
                    </p>
                </div>
            </div>
        `,
  }
  const template = templateDict[formType]

  var decode = {}
  decode['User'] = () => field.displayName
  decode['user'] = () => fieldName
  return decodeData(template, decode)
}

function resolveArrayOfEnumFormField(field, fieldName, formType) {
  const enumValues = field.enum
  const enumValuesString = enumValues.join(`","`)
  const templateDict = {
    view: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="LockedFieldValue">{originalData && originalData.user}</span>
            </div>
        `,
    update: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <IMStaticMultiSelectComponent
                    options={["${enumValuesString}"]}
                    name="user"
                    onChange={handleSelectChange}
                    selectedOptions={modifiedNonFormData.user}
                />
                <p className="ErrorMessage">
                    {errors.user && touched.user && errors.user}
                </p>
            </div>
            `,
    add: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <IMStaticMultiSelectComponent
                    options={["${enumValuesString}"]}
                    name="user"
                    onChange={handleSelectChange}
                />
                <p className="ErrorMessage">
                    {errors.user && touched.user && errors.user}
                </p>
            </div>
        `,
  }
  const template = templateDict[formType]

  var decode = {}
  decode['User'] = () => field.displayName
  decode['user'] = () => fieldName
  return decodeData(template, decode)
}

function resolveEnumFormField(field, fieldName, formType) {
  const enumValues = field.enum
  const enumValuesString = enumValues.join(`","`)
  const templateDict = {
    view: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <span className="LockedFieldValue">{originalData && originalData.user}</span>
            </div>
        `,
    update: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <IMStaticSelectComponent
                    options={["${enumValuesString}"]}
                    name="user"
                    onChange={handleSelectChange}
                    selectedOption={modifiedNonFormData.user}
                />
                <p className="ErrorMessage">
                    {errors.user && touched.user && errors.user}
                </p>
            </div>
            `,
    add: `
            <div className="FormFieldContainer">
                <label className="FormLabel">User</label>
                <IMStaticSelectComponent
                    options={["${enumValuesString}"]}
                    name="user"
                    onChange={handleSelectChange}
                />
                <p className="ErrorMessage">
                    {errors.user && touched.user && errors.user}
                </p>
            </div>
        `,
  }
  const template = templateDict[formType]

  var decode = {}
  decode['User'] = () => field.displayName
  decode['user'] = () => fieldName
  return decodeData(template, decode)
}

function populatedDataWithFormFields(
  originalData,
  fields,
  dataMap,
  keyword,
  formType,
  skipNonEditableFields = false,
) {
  var mutableOriginalData = originalData
  var allChunks = new Array()
  Object.keys(fields).forEach(function (fieldName) {
    var field = fields[fieldName]
    var templateData = dataMap[field.type]
    if (field.foreignKey) {
      if (dataMap.typeahead) {
        // if we can use a generic class for this foreign field
        templateData = dataMap.typeahead(
          schema[field.foreignKey],
          field.displayName,
          fieldName,
        )
        allChunks.push(templateData)
      } else {
        // if we need a custom class
        const builder = typeaheadBuilder(
          mutableOriginalData,
          field,
          fieldName,
          formType,
        )
        mutableOriginalData = builder.originalData
        allChunks.push(builder.formData)
      }
    } else if (field.foreignKeys) {
      if (field.subtype === 'ids') {
        if (dataMap.multiTypeaheadId) {
          // if we can use a generic class for this foreign field
          templateData = dataMap.multiTypeaheadId(
            schema[field.foreignKeys],
            field.displayName,
            fieldName,
          )
          allChunks.push(templateData)
        } else {
          // if we need a custom class
          const builder = multipleTypeaheadIdBuilder(
            mutableOriginalData,
            field,
            fieldName,
          )
          mutableOriginalData = builder.originalData
          allChunks.push(builder.formData)
        }
      } else if (field.subtype === 'objects') {
        if (dataMap.multiTypeaheadId) {
          // if we can use a generic class for this foreign field
          templateData = dataMap.multiTypeahead(
            schema[field.foreignKeys],
            field.displayName,
            fieldName,
          )
          allChunks.push(templateData)
        } else {
          // if we need a custom class
          const builder = multipleTypeaheadBuilder(
            mutableOriginalData,
            field,
            fieldName,
            formType,
          )
          mutableOriginalData = builder.originalData
          allChunks.push(builder.formData)
        }
      }
    } else if (field.type == 'object' && field.subtype == 'enum') {
      const objectWithEnumInitialized = resolveObjectOfEnumFormField(
        field,
        fieldName,
        formType,
      )
      allChunks.push(objectWithEnumInitialized)
    } else if (field.type == 'address' && field.subtype == 'enum') {
      const addressWithEnumInitialized = resolveObjectOfEnumFormField(
        field,
        fieldName,
        formType,
      )
      allChunks.push(addressWithEnumInitialized)
    } else if (field.type == 'array' && field.subtype == 'enum') {
      const arrayOfEnumChunk = resolveArrayOfEnumFormField(
        field,
        fieldName,
        formType,
      )
      allChunks.push(arrayOfEnumChunk)
    } else if (field.type == 'enum') {
      const arrayOfEnumChunk = resolveEnumFormField(field, fieldName, formType)
      allChunks.push(arrayOfEnumChunk)
    } else {
      if (field.editable == false) {
        templateData = !skipNonEditableFields
          ? nonEditableFormFieldTemplateData
          : ''
      }
      const chunkOutputData = decodeTemplate(
        templateData,
        field.displayName,
        fieldName,
        fieldName,
        fieldName,
        [],
      )
      allChunks.push(chunkOutputData)
    }
  })
  allChunks = allChunks.reverse()

  const insertionIndex = mutableOriginalData.indexOf(keyword) + keyword.length
  var outputData = mutableOriginalData
  for (var i = 0; i < allChunks.length; ++i) {
    outputData = [
      outputData.slice(0, insertionIndex),
      allChunks[i] + '\n',
      outputData.slice(insertionIndex),
    ].join('')
  }
  return outputData
}
function populatedDataWithFormErrors(
  originalData,
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
    templateData = decodeTemplate(
      templateData,
      field.displayName,
      fieldName,
      fieldName,
      fieldName,
      [],
    )
    if (field.required === true) {
      if (
        (field.editable === false && skipNonEditableFields === true) ||
        field.type === 'boolean'
      ) {
        return
      }
      var errRequired = decodeTemplate(
        dataMap.required,
        field.displayName,
        fieldName,
        fieldName,
        fieldName,
        [],
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

console.log('Starting scaffoling for ' + schemaKey)
var currentTable = schema[schemaKey]
generateScaffold(currentTable)
