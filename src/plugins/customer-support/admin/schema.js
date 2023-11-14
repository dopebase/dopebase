'use strict'

const schema = {
  ticket_threads: {
    fields: {
      id: { type: 'string', required: true, displayName: 'ID' },
      number: { type: 'string', required: false, displayName: 'Number' },
      author_email: {
        type: 'string',
        required: false,
        displayName: 'Author Email',
      },
      author_name: {
        type: 'string',
        required: false,
        displayName: 'Author Name',
      },
      message_count: {
        type: 'string',
        required: false,
        displayName: 'Message Count',
      },
      subject: { type: 'string', required: false, displayName: 'Subject' },
      is_closed: { type: 'boolean', required: true, displayName: 'Is Closed' },
      is_public: { type: 'boolean', required: true, displayName: 'Is Public' },
      created_at: { type: 'date', required: false, displayName: 'Created At' },
      updated_at: { type: 'date', required: false, displayName: 'Updated At' },
      user_id: {
        type: 'string',
        required: false,
        displayName: 'User ID',
        foreignKey: 'users',
        cellClassName: 'TicketThreadUser',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.email}</span></td></tr></table>`,
          originalDataFormatter: `data.email || data.phone`,
        },
      },
    },
    pluralDisplayName: 'Ticket Threads',
    capitalPluralName: 'TicketThreads',
    tableName: 'ticket_threads',
    lowercaseSingularName: 'ticket_thread',
    singularCapitalName: 'TicketThread',
    lowercasePluralName: 'ticket_threads',
    titleFieldKey: 'subject',
  },
  ticket_messages: {
    pluralDisplayName: 'Ticket Messages',
    capitalPluralName: 'TicketMessages',
    tableName: 'ticket_messages',
    lowercaseSingularName: 'ticket_message',
    singularCapitalName: 'TicketMessage',
    lowercasePluralName: 'ticket_messages',
    titleFieldKey: 'message',

    fields: {
      id: { type: 'string', required: true, displayName: 'ID' },
      sender_email: {
        type: 'string',
        required: false,
        displayName: 'Sender Email',
      },
      from_original_poster: {
        type: 'boolean',
        required: true,
        displayName: 'From Original Poster',
      },
      message: { type: 'string', required: false, displayName: 'Message' },
      thread_id: {
        type: 'string',
        required: false,
        displayName: 'Thread ID',
        foreignKey: 'ticket_threads',
        cellClassName: 'TicketMessageThread',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.subject}</span></td></tr></table>`,
          originalDataFormatter: `data.subject`,
        },
      },
      user_id: {
        type: 'string',
        required: false,
        displayName: 'User ID',
        foreignKey: 'users',
        cellClassName: 'TicketMessageUser',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.email}</span></td></tr></table>`,
          originalDataFormatter: `data.email || data.phone`,
        },
      },
      created_at: { type: 'date', required: false, displayName: 'Created At' },
      updated_at: { type: 'date', required: false, displayName: 'Updated At' },
    },
  },
  ticket_tags: {
    pluralDisplayName: 'Ticket Tags',
    capitalPluralName: 'TicketTags',
    tableName: 'ticket_tags',
    lowercaseSingularName: 'ticket_tag',
    singularCapitalName: 'TicketTag',
    lowercasePluralName: 'ticket_tags',
    titleFieldKey: 'name', // Assuming name is the title field

    fields: {
      id: { type: 'string', required: true, displayName: 'ID' },
      name: { type: 'string', required: false, displayName: 'Name' },
      slug: { type: 'string', required: false, displayName: 'Slug' },
      published: { type: 'boolean', required: true, displayName: 'Published' },
      created_at: { type: 'date', required: false, displayName: 'Created At' },
    },
  },
  settings: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Settings Name' },
      value: { type: 'string', required: false, displayName: 'Settings Value' },
      created_at: { type: 'date', required: true, displayName: 'Created Date' },
      updated_at: { type: 'date', required: true, displayName: 'Updated Date' },
    },

    pluralDisplayName: 'Settings',
    capitalPluralName: 'Settings',
    tableName: 'settings',
    lowercaseSingularName: 'settings',
    singularCapitalName: 'Settings',
    lowercasePluralName: 'settings',
    titleFieldKey: 'name',
  },
  users: {
    pluralDisplayName: 'Users',
    capitalPluralName: 'Users',
    tableName: 'users',
    lowercaseSingularName: 'user',
    singularCapitalName: 'User',
    lowercasePluralName: 'users',
    titleFieldKey: 'email',

    fields: {
      email: { type: 'string', required: true, displayName: 'Email' },
      firstName: {
        type: 'string',
        required: false,
        displayName: 'First Name',
      },
      lastName: { type: 'string', required: false, displayName: 'Last Name' },
      phone: { type: 'string', required: false, displayName: 'Phone' },
      banned: {
        type: 'boolean',
        required: true,
        displayName: 'Banned',
      },
      createdAt: { type: 'date', required: false, displayName: 'Created At' },
      updatedAt: { type: 'date', required: false, displayName: 'Updated At' },
    },
  },
}

module.exports = schema
