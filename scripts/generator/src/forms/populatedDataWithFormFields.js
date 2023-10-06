var { decodeFieldTemplate } = require('../utils/decodeTemplate')
var { decodeData } = require('../utils/decodeData')
var { buildTypeahead } = require('../utils/buildTypeahead')
var { buildMultiTypeaheadByIDs } = require('../utils/buildMultiTypeaheadByIDs')
var {
  buildMultiTypeaheadByObjects,
} = require('../utils/buildMultiTypeaheadByObjects')

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

module.exports = {
  populatedDataWithFormFields,
}
