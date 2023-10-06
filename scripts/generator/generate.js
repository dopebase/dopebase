'use strict'

/*
to use this project, run "node generate.js schema subschema plugin_name"
*/
var decodeData = require('./src/utils/decodeData')
var { generateFormFile } = require('./src/forms/generateFormFile')
var { generateViewFile } = require('./src/forms/generateViewFile')

var {
  addFormTemplateDataByType,
  addFormKeyword,
} = require('./src/forms/templates/addForm')
var {
  editFormTemplateDataByType,
  editFormKeyword,
} = require('./src/forms/templates/editForm')
var {
  viewFormTemplateDataByType,
  viewFormKeyword,
} = require('./src/forms/templates/viewForm')

var fs = require('fs')

var myArgs = process.argv.slice(2)

const allSchemas = require('./schemas/' + myArgs[0])
var schemaKey = myArgs[1]
var pluginName = myArgs.length > 1 ? myArgs[2] : 'generated'
global.pluginName = pluginName

var { outputPath, templatesPath } = require('./src/config')
var { decodeTemplate } = require('./src/utils/decodeTemplate')

function generateFile(fileName, schema, extraQueryParams = null) {
  var { lowercasePluralName } = schema
  var dir = outputPath() + lowercasePluralName

  const data = fs.readFileSync(templatesPath + fileName, 'utf8')
  const finalData = decodeTemplate(data, schema, allSchemas, extraQueryParams)

  const filePath = dir + '/' + fileName
  console.log('Generating ' + filePath)
  fs.writeFile(filePath, finalData, function (err) {
    if (err) return console.log(err)
    console.log('Generated ' + filePath)
  })
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

  const finalData = decodeTemplate(templateData, schema, allSchemas)
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
  const { lowercasePluralName, orderBy } = schema

  const dir = outputPath() + lowercasePluralName

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // REACT - CLIENT CODE

  // // Generate CRUD files
  generateFormFile(
    'add.tsx',
    'add',
    schema,
    allSchemas,
    addFormTemplateDataByType,
    addFormKeyword,
    true,
  )
  generateFile('index.tsx', schema)
  if (orderBy) {
    const { field, desc } = orderBy
    var orderByStr = '?orderBy=' + field
    if (desc) {
      orderByStr += '&desc=true'
    }
    generateFile('list.tsx', schema, orderByStr)
  } else {
    generateFile('list.tsx', schema)
  }
  generateFormFile(
    'update.tsx',
    'update',
    schema,
    allSchemas,
    editFormTemplateDataByType,
    editFormKeyword,
  )
  generateViewFile(
    'view.tsx',
    'view',
    schema,
    allSchemas,
    viewFormTemplateDataByType,
    viewFormKeyword,
  )

  // // Generate admin view http routes
  // generateHTTPRoutes(schema)
  // // Generate the menu items for the admin left menu panel
  // generateMenuItems(schema)

  // // NODE - API Code

  // // Controller
  // generateController(
  //   tableName,
  //   fields,
  //   displayName,
  //   singularName,
  //   lowercasePluralName,
  //   singularCapitalName,
  // )
  // // add API routes
  // generateAPIRoutes(schema)
}

console.log('Starting scaffoling for ' + schemaKey)
var currentTable = allSchemas[schemaKey]
generateScaffold(currentTable)
