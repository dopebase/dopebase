var fs = require('fs')

var { outputPath, templatesPath, nodeAPIOutputPath } = require('../config')

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

const buildColumns = (fields, listTemplateData) => {
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
