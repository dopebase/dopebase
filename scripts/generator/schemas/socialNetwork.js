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
        displayName: 'No. Comments',
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
        displayName: 'No. Reactions',
      },
    },
    displayName: 'Posts',
    tableName: 'SocialNetwork_Posts',
    singularName: 'post',
    singularCapitalName: 'Post',
    pluralName: 'posts',
    titleFieldKey: 'postText',
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
    displayName: 'Comments',
    tableName: 'socialnetwork_comments',
    singularName: 'comment',
    singularCapitalName: 'Comment',
    pluralName: 'comments',
    titleFieldKey: 'name',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  notifications: {
    fields: {
      commented: { type: 'boolean', required: true, displayName: 'Commented' },
      isInteracted: {
        type: 'boolean',
        required: true,
        displayName: 'Interacted',
      },
      reacted: { type: 'boolean', required: true, displayName: 'Reacted' },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      notificationAuthorID: {
        type: 'string',
        required: true,
        displayName: 'User',
        foreignKey: 'users',
        cellClassName: 'NotificationAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      postAuthorID: {
        type: 'string',
        required: true,
        displayName: 'Post Author',
        foreignKey: 'users',
        cellClassName: 'NotificationPostAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      postID: {
        type: 'string',
        required: true,
        displayName: 'Post',
        foreignKey: 'posts',
        cellClassName: 'NotificationPost',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.id} {data.postText}</span></td></tr></table>`,
          originalDataFormatter: `data.postText`,
        },
      },
    },
    displayName: 'Notifications',
    tableName: 'socialnetwork_notifications',
    singularName: 'notification',
    singularCapitalName: 'Notification',
    pluralName: 'notifications',
    titlefieldkey: 'reacted',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  reactions: {
    fields: {
      reactionAuthorID: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'ReactionAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      reaction: {
        type: 'enum',
        required: true,
        displayName: 'Reaction',
        enum: ['angry', 'cry', 'laugh', 'like', 'love', 'surprised'],
      },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      postID: {
        type: 'string',
        required: true,
        displayName: 'Post',
        foreignKey: 'posts',
        cellClassName: 'ReactionPost',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.id} {data.postText}</span></td></tr></table>`,
          originalDataFormatter: `data.postText`,
        },
      },
    },
    displayName: 'Reactions',
    tableName: 'socialnetwork_reactions',
    singularName: 'reaction',
    singularCapitalName: 'Reaction',
    pluralName: 'reactions',
    titleFieldKey: 'reaction',
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
        displayName: 'Post ID',
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
        type: 'multimedia',
        required: true,
        displayName: 'Media',
      },
      storyType: {
        type: 'enum',
        required: true,
        displayName: 'Type',
        enum: ['image', 'video', 'image/jpeg', 'video/mp4'],
      },
      postID: {
        type: 'string',
        required: true,
        displayName: 'Post',
        foreignKey: 'posts',
        cellClassName: 'StoryPost',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.id} {data.postText}</span></td></tr></table>`,
          originalDataFormatter: `data.postText`,
        },
      },
    },
    displayName: 'Stories',
    tableName: 'socialnetwork_stories',
    singularName: 'story',
    singularCapitalName: 'Story',
    pluralName: 'stories',
    titleFieldKey: 'storyMediaURL',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  users: {
    displayName: 'Users',
    tableName: 'users',
    singularName: 'user',
    singularCapitalName: 'User',
    pluralName: 'users',
    titleFieldKey: 'firstName',
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
