'use strict'

const schema = {
  categories: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      photo: { type: 'photo', required: true, displayName: 'Photo' },
      order: { type: 'string', required: true, displayName: 'Order' },
    },
    displayName: 'Categories',
    tableName: 'real_estate_categories',
    singularName: 'category',
    singularCapitalName: 'Category',
    pluralName: 'categories',
    titleFieldKey: 'name',
  },
  filters: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      options: {
        type: 'array',
        cellClassName: 'FilterOptions',
        required: true,
        displayName: 'Options',
      },
      categories: {
        type: 'array',
        subtype: 'ids',
        cellClassName: 'FilterCategories',
        required: false,
        displayName: 'Categories',
        foreignKeys: 'categories',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
    },
    displayName: 'Filters',
    tableName: 'real_estate_filters',
    singularName: 'filter',
    singularCapitalName: 'Filter',
    pluralName: 'filters',
    titleFieldKey: 'name',
  },
  listings: {
    fields: {
      title: { type: 'string', required: true, displayName: 'Title' },
      authorID: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'ListingAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      categoryID: {
        type: 'string',
        required: true,
        displayName: 'Category',
        foreignKey: 'categories',
        cellClassName: 'ListingCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
      description: {
        type: 'string',
        required: true,
        displayName: 'Description',
      },
      place: { type: 'string', required: true, displayName: 'Place' },
      starCount: { type: 'string', required: true, displayName: 'Stars' },
      price: { type: 'string', required: true, displayName: 'Price' },
      filters: { type: 'object', required: true, displayName: 'Filters' },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      isApproved: { type: 'boolean', required: true, displayName: 'Approved' },
      photo: { type: 'photo', required: true, displayName: 'Cover Photo' },
      photos: { type: 'photos', required: true, displayName: 'Photos' },
    },
    displayName: 'Listings',
    tableName: 'real_estate_listings',
    singularName: 'listing',
    singularCapitalName: 'Listing',
    pluralName: 'listings',
    titleFieldKey: 'title',
  },
  reviews: {
    fields: {
      authorID: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'ReviewsAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      listingID: {
        type: 'string',
        required: true,
        displayName: 'Listing',
        foreignKey: 'listings',
        cellClassName: 'ReviewsListing',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.title}</span></td></tr></table>`,
          originalDataFormatter: `data.title`,
        },
      },
      content: { type: 'string', required: true, displayName: 'Content' },
      starCount: { type: 'string', required: true, displayName: 'Stars' },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
    },
    displayName: 'Reviews',
    tableName: 'real_estate_reviews',
    singularName: 'review',
    singularCapitalName: 'Review',
    pluralName: 'reviews',
    titleFieldKey: 'starCount',
  },
  saved_listings: {
    fields: {
      userID: {
        type: 'string',
        required: true,
        displayName: 'User',
        foreignKey: 'users',
        cellClassName: 'Saved_ListingUser',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      listingID: {
        type: 'string',
        required: true,
        displayName: 'Listing',
        foreignKey: 'listings',
        cellClassName: 'Saved_ListingListing',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.title}</span></td></tr></table>`,
          originalDataFormatter: `data.title`,
        },
      },
    },
    displayName: 'Saved_Listings',
    tableName: 'real_estate_saved_listings',
    singularName: 'saved_listing',
    singularCapitalName: 'Saved_listing',
    pluralName: 'saved_listings',
    titleFieldKey: 'listingID',
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
    options: `{return (<li>{data}</li>)}`,
    filters: `{return (<li>{data}</li>)}`,
    categories: `{
            const path = viewPath && viewPath[index]
            return (
                <li>
                    <a href={path}>
                       {data.name}
                    </a>
                </li>
            )
        }`,
  },
}

module.exports = schema
