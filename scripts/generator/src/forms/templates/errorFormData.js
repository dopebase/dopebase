const errFormKeyword = '/* Insert all form errors here */'
const errFormTemplateData = {
  string: '',
  photo: '',
  photos: '',
  date: '',
  location: '',
  simpleLocation: '',
  address: '',
  array: '',
  object: ``,
  boolean:
    "\n\
        if (values.user !== true && values.user !== false) {\n\
            errors.user = 'Field Required!'\n\
        }\n",
  color: '',
  colors: '',
  phone:
    "\n\
        if (!values.user.match(/^(?(d{3}))?[- ]?(d{3})[- ]?(d{4})$/)) {\n\
            errors.user = 'Invalid User!'\n\
        }\n",
  phoneNumber:
    "\n\
        if (!values.user.match(/^(?(d{3}))?[- ]?(d{3})[- ]?(d{4})$/)) {\n\
            errors.user = 'Invalid User!'\n\
        }\n",
  email:
    "\n\
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.user)) {\n\
            errors.user = 'Invalid User!'\n\
        }\n",
  required:
    "\n\
        if (!values.user) {\n\
            errors.user = 'Field Required!'\n\
        }\n",
}

module.exports = {
  errFormKeyword,
  errFormTemplateData,
}
