const decodeTemplate = (
  template,
  displayName,
  singularName,
  pluralName,
  tableName,
  fields,
  singularCapitalName = displayName,
  extraQueryParams = null,
) => {
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
    return buildColumns(fields, template)
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

module.exports = decodeTemplate
