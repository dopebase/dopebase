'use strict'

const schema = {
  articles: {
    fields: {
      title: { type: 'string', required: false, displayName: 'Title' },
      content: { type: 'markdown', required: false, displayName: 'Content' },
      cover_photo: {
        type: 'photo',
        required: false,
        displayName: 'Cover Photo',
      },
      photo_urls: {
        type: 'photos',
        required: false,
        displayName: 'Photos',
      },
      source_code_url: {
        type: 'string',
        required: false,
        displayName: 'Github URL',
      },
      canonical_url: {
        type: 'string',
        required: false,
        displayName: 'Canonical URL',
      },
      published: { type: 'boolean', required: true, displayName: 'Published' },
      outdated: { type: 'boolean', required: true, displayName: 'Outdated' },
      slug: { type: 'string', required: false, displayName: 'Slug' },
      seo_title: { type: 'string', required: false, displayName: 'SEO Title' },
      seo_description: {
        type: 'string',
        required: false,
        displayName: 'SEO Description',
      },
      seo_keyword: {
        type: 'string',
        required: false,
        displayName: 'SEO Keyword',
      },
      author_id: {
        type: 'string',
        required: false,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'ArticleAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profile_picture_url} /></td><td><span>{data.first_name} {data.last_name} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.first_name + " " + data.last_name`,
        },
      },
      category_id: {
        type: 'string',
        required: false,
        displayName: 'Category',
        foreignKey: 'article_categories',
        cellClassName: 'ArticleCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
      tags: {
        type: 'array',
        subtype: 'ids',
        cellClassName: 'ArticleTags',
        required: false,
        displayName: 'ArticleTags',
        foreignKeys: 'article_tags',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
      created_at: { type: 'date', required: true, displayName: 'Created At' },
      updated_at: { type: 'date', required: true, displayName: 'Updated At' },
    },
    pluralDisplayName: 'Articles',
    capitalPluralName: 'Articles',
    tableName: 'articles',
    lowercaseSingularName: 'article',
    singularCapitalName: 'Article',
    lowercasePluralName: 'articles',
    titleFieldKey: 'title',
  },
  article_categories: {
    fields: {
      name: { type: 'string', required: false, displayName: 'Name' },
      description: {
        type: 'markdown',
        required: false,
        displayName: 'Description',
      },
      slug: { type: 'string', required: false, displayName: 'Slug' },
      logo_url: { type: 'photo', required: false, displayName: 'Logo' },
      seo_title: { type: 'string', required: false, displayName: 'SEO Title' },
      seo_description: {
        type: 'string',
        required: false,
        displayName: 'SEO Description',
      },
      canonical_url: {
        type: 'string',
        required: false,
        displayName: 'Canonical URL',
      },
      seo_image_url: {
        type: 'photo',
        required: false,
        displayName: 'SEO Cover Image',
      },
      published: { type: 'boolean', required: true, displayName: 'Published' },
      parent_id: {
        type: 'string',
        required: false,
        displayName: 'Parent Category',
        foreignKey: 'article_categories',
        cellClassName: 'ParentArticleCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
    },
    pluralDisplayName: 'Article Categories',
    capitalPluralName: 'ArticleCategories',
    tableName: 'article_categories',
    lowercaseSingularName: 'category',
    singularCapitalName: 'Category',
    lowercasePluralName: 'article_categories',
    titleFieldKey: 'title',
  },
  article_tags: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      description: {
        type: 'markdown',
        required: false,
        displayName: 'Description',
      },
      published: {
        type: 'boolean',
        required: true,
        displayName: 'Published',
      },
      seo_title: { type: 'string', required: false, displayName: 'SEO Title' },
      seo_description: {
        type: 'string',
        required: false,
        displayName: 'SEO Description',
      },
      canonical_url: {
        type: 'string',
        required: false,
        displayName: 'Canonical URL',
      },
      slug: {
        type: 'string',
        required: false,
        displayName: 'Slug',
      },
      seo_image_url: {
        type: 'photo',
        required: false,
        displayName: 'SEO Cover Image',
      },
      created_at: { type: 'date', required: true, displayName: 'Created Date' },
    },

    pluralDisplayName: 'Article Tags',
    capitalPluralName: 'ArticleCategories',
    tableName: 'article_tags',
    lowercaseSingularName: 'article_tag',
    singularCapitalName: 'ArticleTag',
    lowercasePluralName: 'article_tags',
    titleFieldKey: 'title',
  },

  article_ideas: {
    fields: {
      title: { type: 'string', required: true, displayName: 'Title' },
      sections: { type: 'string', required: false, displayName: 'Sections' },
      tags: { type: 'string', required: false, displayName: 'Tags' },
      status: { type: 'string', required: false, displayName: 'Status' },
      extra_prompt: {
        type: 'string',
        required: false,
        displayName: 'Extra Prompt',
      },
      tweet: { type: 'string', required: false, displayName: 'Social Media' },
      seo_description: {
        type: 'string',
        required: false,
        displayName: 'SEO Description',
      },
      summary: { type: 'string', required: false, displayName: 'Summary' },
      topic: { type: 'string', required: false, displayName: 'Topic' },
      category: { type: 'string', required: false, displayName: 'Category' },
      created_at: { type: 'date', required: true, displayName: 'Created Date' },
      updated_at: { type: 'date', required: true, displayName: 'Created Date' },
    },

    pluralDisplayName: 'Ideas',
    capitalPluralName: 'ArticleIdeas',
    tableName: 'article_ideas',
    lowercaseSingularName: 'article_idea',
    singularCapitalName: 'ArticleIdea',
    lowercasePluralName: 'article_ideas',
    titleFieldKey: 'title',
  },
  users: {
    pluralDisplayName: 'Users',
    capitalPluralName: 'Users',
    tableName: 'users',
    lowercaseSingularName: 'user',
    singularCapitalName: 'User',
    lowercasePluralName: 'users',
    titleFieldKey: 'title',

    fields: {
      email: { type: 'string', required: true, displayName: 'Email' },
      first_name: {
        type: 'string',
        required: false,
        displayName: 'First Name',
      },
      last_name: { type: 'string', required: false, displayName: 'Last Name' },
      phone: { type: 'string', required: false, displayName: 'Phone' },
      role: { type: 'string', required: false, displayName: 'Role' },
      bio_title: {
        type: 'string',
        required: false,
        displayName: 'Short Bio',
      },
      bio_description: {
        type: 'markdown',
        required: false,
        displayName: 'Long Bio',
      },
      website_url: {
        type: 'string',
        required: false,
        displayName: 'Website URL',
      },
      username: {
        type: 'string',
        required: false,
        displayName: 'Username',
      },
      banned: {
        type: 'boolean',
        required: true,
        displayName: 'Banned',
      },
      created_at: { type: 'date', required: true, displayName: 'Created At' },
      updated_at: { type: 'date', required: true, displayName: 'Updated At' },
    },
  },
  mapRenderers: {
    tags: `{
            const path = viewPath && viewPath[index]
            return (
                <li>
                    <span>
                        <a href={data.canonical_url}>
                            {data.name}
                        </a>
                    </span>
                </li>
            )
        }`,
  },
}

module.exports = schema
