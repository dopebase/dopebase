var { buildColumns } = require('./buildColumns')

const decoders = (schema, allSchemas, extraQueryParams) => {
  const {
    fields,
    pluralDisplayName,
    lowercaseSingularName,
    capitalPluralName,
    lowercasePluralName,
    singularCapitalName,
  } = schema

  var decode = {}
  decode['$capitalcaseplural$'] = () => capitalPluralName
  decode['$lowercaseplural$'] = () => lowercasePluralName
  decode['$capitalsingular$'] = () => singularCapitalName
  decode['$displayplural$'] = () => pluralDisplayName
  decode['$lowercasesingular$'] = () => lowercaseSingularName
  decode['user'] = () => 'user'
  decode['User'] = () => 'User'
  decode['$columns$'] = template => {
    return buildColumns(fields, template, allSchemas)
  }
  decode['$extraQueryParams$'] = () =>
    extraQueryParams ? `"${extraQueryParams}"` : 'null'

  return decode
}

// order is important here - we want to replace the longest strings first
const decoderKeys = [
  '$capitalcaseplural$',
  '$lowercaseplural$',
  '$capitalsingular$',
  '$displayplural$',
  '$lowercasesingular$',
  '$columns$',
  '$extraQueryParams$',
  'user',
  'User',
]

module.exports = { decoders, decoderKeys }
