const Validator = require('validator')

export function unescapeString(s?: string): string {
  if (!s) {
    return s
  }
  return Validator.unescape(s)
}

export function unescapeObject(object?: any): any {
  if (!object) {
    return object
  }
  if (object && typeof object === 'string') {
    return unescapeString(object)
  }
  if (Array.isArray(object)) {
    return object.map(o => unescapeObject(o))
  }
  const keys = Object.keys(object)
  var res = {}
  for (var i = 0; i < keys.length; ++i) {
    const key = keys[i]
    const val = object[key]
    if (val && typeof val === 'string' && val?.length > 0) {
      res[key] = Validator.unescape(val)
    } else if (val && Array.isArray(val)) {
      res[key] = val.map(s =>
        s && typeof s === 'string' && s?.length > 0 ? Validator.unescape(s) : s,
      )
    } else {
      res[key] = val
    }
  }
  return res
}

export function escapeObject(object?: any): any {
  if (!object) {
    return object
  }
  const keys = Object.keys(object)
  var res = {}
  for (var i = 0; i < keys.length; ++i) {
    const key = keys[i]
    const val = object[key]
    if (val && typeof val === 'string' && val?.length > 0) {
      res[key] = Validator.escape(val)
    } else if (val && Array.isArray(val)) {
      res[key] = val.map(s =>
        s && typeof s === 'string' && s?.length > 0 ? Validator.escape(s) : s,
      )
    } else {
      res[key] = val
    }
  }
  return res
}

export function replaceUndefinedKeysWithEmptyStrings(object?: any): any {
  if (!object) {
    return object
  }
  const keys = Object.keys(object)
  var res = {}
  for (var i = 0; i < keys.length; ++i) {
    const key = keys[i]
    const val = object[key]
    if (val === undefined) {
      res[key] = ''
    } else {
      res[key] = val
    }
  }
  return res
}
