var { decodeTemplate, decodeFieldTemplate } = require('../utils/decodeTemplate')
var { buildTypeahead } = require('../utils/buildTypeahead')
var { buildMultiTypeaheadByIDs } = require('../utils/buildMultiTypeaheadByIDs')
var {
  buildMultiTypeaheadByObjects,
} = require('../utils/buildMultiTypeaheadByObjects')

var { decodeData } = require('../utils/decodeData')

var { outputPath, templatesPath } = require('../config')

var fs = require('fs')

const nonEditableFormFieldTemplateData = `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className="LockedFieldValue">{originalData && originalData.user}</span>
            </div>
`

function resolveObjectOfEnumFormField(field, fieldName, formType) {
  const enumValues = field.enum
  const enumValuesString = `'` + enumValues.join(`': "",'`) + `': "",`
  const templateDict = {
    view: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
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
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
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
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
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
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className="LockedFieldValue">{originalData && originalData.user}</span>
            </div>
        `,
    update: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
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
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
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
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className="LockedFieldValue">{originalData && originalData.user}</span>
            </div>
        `,
    update: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
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
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
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

function populatedDataWithFormFields(
  originalData,
  allSchemas,
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
          allSchemas[field.foreignKey],
          field.displayName,
          fieldName,
        )
        allChunks.push(templateData)
      } else {
        // if we need a custom class
        const builder = buildTypeahead(
          mutableOriginalData,
          allSchemas,
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
            allSchemas[field.foreignKeys],
            field.displayName,
            fieldName,
          )
          allChunks.push(templateData)
        } else {
          // if we need a custom class
          const builder = buildMultiTypeaheadByIDs(
            mutableOriginalData,
            allSchemas,
            field,
            fieldName,
            allSchemas,
          )
          mutableOriginalData = builder.originalData
          allChunks.push(builder.formData)
        }
      } else if (field.subtype === 'objects') {
        if (dataMap.multiTypeaheadId) {
          // if we can use a generic class for this foreign field
          templateData = dataMap.multiTypeahead(
            allSchemas[field.foreignKeys],
            field.displayName,
            fieldName,
          )
          allChunks.push(templateData)
        } else {
          // if we need a custom class
          const builder = buildMultiTypeaheadByObjects(
            mutableOriginalData,
            allSchemas,
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
      const chunkOutputData = decodeFieldTemplate(
        templateData,
        allSchemas,
        field.displayName,
        fieldName,
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
    singularName,
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
  generateFormFile,
}
