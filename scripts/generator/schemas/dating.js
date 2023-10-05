'use strict'

const schema = {
  swipes: {
    fields: {
      author: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'SwipesAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      hasBeenSeen: { type: 'boolean', required: true, displayName: 'Seen' },
      type: {
        type: 'enum',
        required: true,
        displayName: 'Type',
        enum: ['like', 'dislike'],
      },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      swipedProfile: {
        type: 'string',
        required: true,
        displayName: 'Profile Swiped',
        foreignKey: 'users',
        cellClassName: 'SwipesSwipedProfile',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
    },
    displayName: 'Swipes',
    tableName: 'swipes',
    singularName: 'swipe',
    singularCapitalName: 'Swipe',
    lowercasePluralName: 'swipes',
    titleFieldKey: 'type',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  reports: {
    fields: {
      source: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'ReportsSource',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      type: {
        type: 'enum',
        required: true,
        displayName: 'Type',
        enum: ['Report Post', 'Block User'],
      },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      dest: {
        type: 'string',
        required: true,
        displayName: 'Receiver',
        foreignKey: 'users',
        cellClassName: 'ReportsDest',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
    },
    displayName: 'Reports',
    tableName: 'reports',
    singularName: 'report',
    singularCapitalName: 'Report',
    lowercasePluralName: 'reports',
    titleFieldKey: 'type',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  // swipe_counts: {
  //     fields:
  //         {
  //             authorID: { type: 'string', required: true, displayName: 'Author', foreignKey: 'users', cellClassName: 'SwipesAuthor',
  //                 typeaheadRenderers: {
  //                     dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
  //                     originalDataFormatter: `data.firstName + " " + data.lastName`,
  //                 }
  //              },
  //             count: { type: 'string', required: true, displayName: 'Count', },
  //             createdAt: { type: 'date', required: true, displayName: 'Created' },
  //         },
  //     displayName: "Swipe_Counts",
  //     tableName: "swipe_counts",
  //     singularName: "swipe_count",
  //     singularCapitalName: "Swipe_count",
  //     lowercasePluralName: "swipe_counts",
  //     titleFieldKey: "count"
  // },
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
