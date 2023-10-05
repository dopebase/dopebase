'use strict'

const schema = {
  sent_emails: {
    fields: {
      subject: { type: 'string', required: true, displayName: 'Subject' },
      from: { type: 'string', required: true, displayName: 'From' },
      message: { type: 'string', required: true, displayName: 'Message' },
    },
    displayName: 'Sent_Emails',
    tableName: 'sent_emails',
    singularName: 'email',
    singularCapitalName: 'Email',
    lowercasePluralName: 'emails',
    titleFieldKey: 'name',
  },
  email_templates: {
    fields: {
      title: { type: 'string', required: true, displayName: 'Title' },
      description: {
        type: 'string',
        required: true,
        displayName: 'Description',
      },
      html: { type: 'string', required: true, displayName: 'Html' },
      photos: { type: 'photos', required: true, displayName: 'Photos' },
    },
    displayName: 'Templates',
    tableName: 'email_templates',
    singularName: 'template',
    singularCapitalName: 'Template',
    lowercasePluralName: 'templates',
    titleFieldKey: 'name',
  },
  users: {
    displayName: 'Users',
    tableName: 'users',
    singularName: 'user',
    singularCapitalName: 'User',
    lowercasePluralName: 'users',
    titleFieldKey: 'firstName',
  },
  mapRenderers: {},
}

module.exports = schema
