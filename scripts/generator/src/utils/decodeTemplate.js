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
  var decode = decoders(schema, allSchemas)

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
