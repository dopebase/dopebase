'use strict'

const schema = {
  posts: {
    fields: {
      id: {
        type: 'string',
        editable: false,
        required: true,
        displayName: 'Post ID',
      },
      authorID: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'PostAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      commentCount: {
        type: 'string',
        required: true,
        displayName: 'Number of Comments',
      },
      postText: { type: 'string', required: true, displayName: 'Content' },
      // postMedia: { type: 'array', subtype: "objects", cellClassName: 'PostMedia', required: true, displayName: 'Media', },
      postMedia: { type: 'multimedias', required: true, displayName: 'Media' },
      location: { type: 'string', required: false, displayName: 'Location' },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      // reactions: { type: 'object', subtype: 'enum', required: true, displayName: 'Reactions', enum: ['angry', 'cry', 'laugh', 'like', 'love', 'sad', 'surprised'] },
      reactionsCount: {
        type: 'string',
        required: true,
        displayName: 'Number of Reactions',
      },
    },
    pluralDisplayName: 'Posts',
    capitalPluralName: 'Posts',
    tableName: 'posts',
    lowercaseSingularName: 'post',
    singularCapitalName: 'Post',
    lowercasePluralName: 'posts',
    titleFieldKey: 'id',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  comments: {
    fields: {
      authorID: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'CommentAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      commentText: { type: 'string', required: true, displayName: 'Content' },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      postID: {
        type: 'string',
        required: true,
        displayName: 'Post',
        foreignKey: 'posts',
        cellClassName: 'CommentPost',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.id} {data.postText}</span></td></tr></table>`,
          originalDataFormatter: `data.postText`,
        },
      },
    },
    pluralDisplayName: 'Comments',
    capitalPluralName: 'Comments',
    tableName: 'comments',
    lowercaseSingularName: 'comment',
    singularCapitalName: 'Comment',
    lowercasePluralName: 'comments',
    titleFieldKey: 'id',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  notifications: {
    fields: {
      title: { type: 'string', required: true, displayName: 'Title' },
      body: { type: 'string', required: true, displayName: 'Body' },
      type: { type: 'string', required: true, displayName: 'Type' },
      seen: {
        type: 'boolean',
        required: true,
        displayName: 'Marked as Seen?',
      },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      toUserID: {
        type: 'string',
        required: true,
        displayName: 'Recipient User',
        foreignKey: 'users',
        cellClassName: 'NotificationRecipientUser',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
    },
    pluralDisplayName: 'Notifications',
    capitalPluralName: 'Notifications',
    tableName: 'notifications',
    lowercaseSingularName: 'notification',
    singularCapitalName: 'Notification',
    lowercasePluralName: 'notifications',
    titleFieldKey: 'id',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  stories: {
    fields: {
      id: {
        type: 'string',
        editable: false,
        required: true,
        displayName: 'Story ID',
      },
      authorID: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'StoryAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      storyMediaURL: {
        type: 'photo',
        required: true,
        displayName: 'Media',
      },
      storyType: {
        type: 'enum',
        required: true,
        displayName: 'Type',
        enum: ['image', 'video', 'image/jpeg', 'video/mp4'],
      },
    },
    pluralDisplayName: 'Stories',
    capitalPluralName: 'Stories',
    tableName: 'stories',
    lowercaseSingularName: 'story',
    singularCapitalName: 'Story',
    lowercasePluralName: 'stories',
    titleFieldKey: 'id',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
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
      username: { type: 'string', required: false, displayName: 'Username' },
      firstName: {
        type: 'string',
        required: false,
        displayName: 'First Name',
      },
      lastName: { type: 'string', required: false, displayName: 'Last Name' },
      phone: { type: 'string', required: false, displayName: 'Phone' },
      profilePictureURL: {
        type: 'photo',
        required: false,
        displayName: 'Profile Picture',
      },
      banned: {
        type: 'boolean',
        required: true,
        displayName: 'Banned',
      },
      role: {
        type: 'enum',
        required: false,
        displayName: 'Role',
        enum: ['admin', 'user'],
      },
      createdAt: { type: 'date', required: false, displayName: 'Created At' },
      updatedAt: { type: 'date', required: false, displayName: 'Updated At' },
    },
  },
  mapRenderers: {
    postMedia: `{
            return (
                <li>
                    <a href={data.url}>
                       {data.url}
                    </a>
                </li>
            )
        }`,
  },
}

module.exports = schema
