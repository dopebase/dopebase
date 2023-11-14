'use strict'

const schema = {
  payment_methods: {
    fields: {
      id: { type: 'string', required: false, displayName: 'ID' },
      provider: {
        type: 'enum',
        required: true,
        displayName: 'Provider',
        enum: ['Stripe', 'PayPal', 'Other'],
      },
      details: { type: 'string', required: true, displayName: 'Details' },
      is_default: {
        type: 'boolean',
        required: true,
        displayName: 'Is Default',
      },
      stripeCustomerID: {
        type: 'string',
        required: false,
        displayName: 'Stripe Customer ID',
      },

      brand: { type: 'string', required: false, displayName: 'Brand' },
      last4: { type: 'string', required: false, displayName: 'Last 4' },
      expiryMonth: {
        type: 'string',
        required: false,
        displayName: 'Expiry Month',
      },
      expiryYear: {
        type: 'string',
        required: false,
        displayName: 'Expiry Year 4',
      },
      userID: {
        type: 'string',
        required: false,
        displayName: 'User',
        foreignKey: 'users',
        cellClassName: 'PaymentMethodUser',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
        createdAt: { type: 'date', required: true, displayName: 'Created At' },
        updatedAt: { type: 'date', required: true, displayName: 'Updated At' },
      },
    },
    pluralDisplayName: 'Payment Methods',
    capitalPluralName: 'PaymentMethods',
    tableName: 'payment_methods',
    lowercaseSingularName: 'payment_method',
    singularCapitalName: 'PaymentMethod',
    lowercasePluralName: 'payment_methods',
    titleFieldKey: 'id',
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
      role: {
        type: 'enum',
        required: false,
        displayName: 'Role',
        enum: ['passenger', 'driver', 'admin', 'other'],
      },
      carPictureURL: {
        type: 'photo',
        required: false,
        displayName: 'Car Photo',
      },
      carName: {
        type: 'string',
        required: false,
        displayName: 'Car Model',
      },
      carNumber: {
        type: 'string',
        required: false,
        displayName: 'License Plate',
      },

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
