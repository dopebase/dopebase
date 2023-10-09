var fs = require('fs')

var { outputPath, templatesPath, nodeAPIOutputPath } = require('../config')
var { decodeData } = require('./decodeData')

function foreignKeysArrayIdTableCellBuilder(
  itemRendererString,
  fieldName,
  apiRoute,
  field,
  listTemplateData,
) {
  // For array data types, we first generate a custom cell for tables
  var dir = outputPath()

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
  const folderPath = dir + '../components/tableCells/'
  const filePath = folderPath + fileName
  console.log('Generating ' + filePath)
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)
  const importData =
    '\nimport ' +
    className +
    " from '../../components/tableCells/" +
    fileName +
    "'\n"

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
  var dir = outputPath()

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
  const folderPath = dir + 'tableCells/'
  const filePath = folderPath + fileName
  console.log('Generating ' + filePath)
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)
  const importData =
    '\nimport ' +
    className +
    " from '../../components/tableCells/" +
    fileName +
    "'\n"

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
  var dir = outputPath()

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
  const filePath = dir + '../components/tableCells/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)

  const importData =
    '\nimport ' +
    className +
    " from '../../components/tableCells/" +
    fileName +
    "'\n"
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
  console.log(`generating custom table cell for ${fieldName}`)
  // For object data types, we first generate a custom cell for tables
  var dir = outputPath()

  var decode = {}
  decode['$capitalcase$'] = () => field.cellClassName
  decode['$lowercase$'] = () => fieldName
  decode['$dataItemRenderer$'] = () => itemRendererString

  const data = fs.readFileSync(
    templatesPath + 'customTableCells/ObjectTableCell.js',
    'utf8',
  )
  const finalData = decodeData(data, decode)

  const className = field.cellClassName + 'ObjectTableCell'
  const fileName = className + '.js'
  const folderPath = dir + '../components/tableCells/'
  const filePath = folderPath + fileName
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })

  // Then we import that custom class into the list
  const importsIndicator = '/* Insert extra imports for table cells here */'
  var insertionIndex = listTemplateData.indexOf(importsIndicator)
  const importData =
    '\nimport ' +
    className +
    " from '../../components/tableCells/" +
    fileName +
    "'\n"
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
              <${className} data={data.value} />
          )
      },`

  return {
    columnString,
    templateData: outputData,
  }
}

const buildColumns = (fields, listTemplateData, allSchemas) => {
  var columnsString = ''
  var outputListTemplateData = listTemplateData

  console.log(fields)
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
    } else if (
      field.type == 'object' &&
      allSchemas.mapRenderers &&
      allSchemas.mapRenderers[fieldName]
    ) {
      // Render object types in list cells using custom renderers
      const builder = objectTableCellBuilder(
        allSchemas.mapRenderers[fieldName],
        fieldName,
        field,
        outputListTemplateData,
      )
      columnsString = columnsString + builder.columnString
      outputListTemplateData = builder.templateData
    } else if (field.type == 'object') {
      // Render object types in list cells using default renderers
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
        console.log('foreign keys array id table cell builder')
        console.log(fieldName)
        const builder = foreignKeysArrayIdTableCellBuilder(
          allSchemas.mapRenderers[fieldName],
          fieldName,
          allSchemas[field.foreignKeys].lowercaseSingularName,
          field,
          outputListTemplateData,
        )
        columnsString = columnsString + builder.columnString
        outputListTemplateData = builder.templateData
      } else if (field.subtype === 'objects') {
        const builder = foreignKeysArrayTableCellBuilder(
          allSchemas.mapRenderers[fieldName],
          fieldName,
          allSchemas[field.foreignKeys].lowercaseSingularName,
          field,
          outputListTemplateData,
        )
        columnsString = columnsString + builder.columnString
        outputListTemplateData = builder.templateData
      }
    } else if (field.type == 'array') {
      const builder = arrayTableCellBuilder(
        allSchemas.mapRenderers[fieldName],
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
              <IMDateTableCell timestamp={data.value} />
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
              <IMForeignKeyTableCell id={data.value} apiRouteName="admin/${
                global.pluginName
              }/${
          allSchemas[field.foreignKey].lowercasePluralName
        }" viewRoute="${allSchemas[field.foreignKey].lowercasePluralName}"
          titleKey="${allSchemas[field.foreignKey].titleFieldKey}" />
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

module.exports = { buildColumns }
