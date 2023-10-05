'use strict'

const schema = {
  subscriptions: {
    fields: {
      productId: { type: 'string', required: true, displayName: 'Product' },
      userID: {
        type: 'string',
        required: true,
        displayName: 'Customer',
        foreignKey: 'users',
        cellClassName: 'SubscriptionUser',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      subscriptionPeriod: {
        type: 'string',
        required: true,
        displayName: 'Subscription period',
      },
      transactionDate: {
        type: 'date',
        required: true,
        displayName: 'Transaction Date',
      },
    },
    displayName: 'Subscriptions',
    tableName: 'subscriptions',
    singularName: 'subscription',
    singularCapitalName: 'Subscription',
    lowercasePluralName: 'subscriptions',
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
