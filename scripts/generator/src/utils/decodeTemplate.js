var { decoderKeys, decoders } = require('./decoders')

const decodeTemplate = (
  template,
  schema,
  allSchemas,
  extraQueryParams = null,
) => {
  var decode = decoders(schema, allSchemas, extraQueryParams)

  var output = template
  decoderKeys.forEach(keyword => {
    // output = output.replace(new RegExp(keyword, 'g'), decode[keyword]())
    if (keyword == '$columns$') {
      // if the keyword modifies the underlying data, we need to make sure we keep those alterations
      const builder = decode[keyword](output)
      output = builder.templateData
      output = output && output.split(keyword).join(builder.columnsString)
    } else {
      console.log(`replacing ${keyword} with ${decode[keyword]()}`)
      output = output && output.split(keyword).join(decode[keyword]())
    }
  })

  return output
}

const decodeFieldTemplate = (template, allSchemas, displayName, fieldName) => {
  const schema = {
    fields: [],
    displayName,
    singularName: fieldName,
    lowercasePluralName: fieldName,
    singularCapitalName: fieldName,
  }
  console.log('decode field template ' + fieldName)
  var decode = decoders(schema, allSchemas)

  decode['$fielddisplay$'] = () => fieldName
  decode['$fieldkey$'] = () => displayName
  decode['user'] = () => fieldName
  decode['User'] = () => displayName

  var output = template
  decoderKeys.forEach(keyword => {
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

module.exports = { decodeTemplate, decodeFieldTemplate }
