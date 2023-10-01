'use strict'

const schema = {
  categories: {
    fields: {
      title: { type: 'string', required: true, displayName: 'Title' },
      photo: { type: 'photo', required: true, displayName: 'Photo' },
      order: { type: 'string', required: true, displayName: 'Order' },
    },
    displayName: 'Categories',
    tableName: 'vendor_categories',
    singularName: 'category',
    singularCapitalName: 'Category',
    pluralName: 'categories',
    titleFieldKey: 'title',
  },
  restaurants: {
    fields: {
      title: { type: 'string', required: true, displayName: 'Title' },
      photo: { type: 'photo', required: true, displayName: 'Cover Photo' },
      photos: { type: 'photos', required: true, displayName: 'Photos' },
      authorID: {
        type: 'string',
        required: true,
        displayName: 'Author',
        foreignKey: 'users',
        cellClassName: 'RestaurantsAuthor',
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
        cellClassName: 'RestaurantsCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.title}</span></td></tr></table>`,
          originalDataFormatter: `data.title`,
        },
      },
      description: {
        type: 'string',
        required: true,
        displayName: 'Description',
      },
      price: { type: 'string', required: true, displayName: 'Price $$$' },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
    },
    displayName: 'Restaurants',
    tableName: 'vendors',
    singularName: 'restaurant',
    singularCapitalName: 'Restaurant',
    pluralName: 'restaurants',
    titleFieldKey: 'title',
  },
  products: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      photo: { type: 'photo', required: true, displayName: 'Cover Photo' },
      photos: { type: 'photos', required: true, displayName: 'Photos' },
      price: { type: 'string', required: true, displayName: 'Price' },
      restaurant: {
        type: 'string',
        required: true,
        displayName: 'Restaurant',
        foreignKey: 'restaurants',
        cellClassName: 'ProductsRestaurant',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.title}</span></td></tr></table>`,
          originalDataFormatter: `data.title`,
        },
      },
      description: {
        type: 'string',
        required: true,
        displayName: 'Description',
      },
    },
    displayName: 'Products',
    tableName: 'vendor_products',
    singularName: 'product',
    singularCapitalName: 'Product',
    pluralName: 'products',
    titleFieldKey: 'name',
  },
  orders: {
    fields: {
      id: {
        type: 'string',
        editable: false,
        required: true,
        displayName: 'Order ID',
      },
      address: {
        type: 'address',
        subtype: 'enum',
        required: true,
        displayName: 'Delivery Address',
        enum: [
          'city',
          'country',
          'email',
          'line1',
          'line2',
          'name',
          'phone',
          'postal code',
        ],
      },
      // address: { type: 'address', required: true, displayName: 'Shipping Address' },
      products: {
        type: 'array',
        subtype: 'objects',
        cellClassName: 'OrdersProduct',
        required: true,
        displayName: 'Products',
        foreignKeys: 'products',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
      authorID: {
        type: 'string',
        required: true,
        displayName: 'Customer',
        foreignKey: 'users',
        cellClassName: 'OrdersAuthor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      vendorID: {
        type: 'string',
        required: true,
        displayName: 'Restaurant',
        foreignKey: 'restaurants',
        cellClassName: 'OrdersVendor',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.title}</span></td></tr></table>`,
          originalDataFormatter: `data.title`,
        },
      },
      status: {
        type: 'enum',
        required: true,
        displayName: 'Status',
        enum: [
          'Order Placed',
          'Order Delivered',
          'Order Cancelled',
          'Order Shipped',
          'In Transit',
          'Driver Pending',
          'Order Accepted',
          'Driver Rejected',
          'Driver Accepted',
          'Order Completed',
        ],
      },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
    },
    displayName: 'Orders',
    tableName: 'restaurant_orders',
    singularName: 'order',
    singularCapitalName: 'Order',
    pluralName: 'orders',
    titleFieldKey: 'id',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
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
      entityID: {
        type: 'string',
        required: true,
        displayName: 'Restaurant',
        foreignKey: 'restaurants',
        cellClassName: 'ReviewsRestaurant',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.title}</span></td></tr></table>`,
          originalDataFormatter: `data.title`,
        },
      },
      text: { type: 'string', required: true, displayName: 'Review' },
      rating: { type: 'string', required: true, displayName: 'Rating' },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
    },
    displayName: 'Reviews',
    tableName: 'vendor_reviews',
    singularName: 'review',
    singularCapitalName: 'Review',
    pluralName: 'reviews',
    titleFieldKey: 'starCount',
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
    categories: `{
            const path = viewPath && viewPath[index]
            return (
                <li>
                    <a href={path}>
                       {data.title}
                    </a>
                </li>
            )
        }`,
    products: `{
            const path = viewPath && viewPath[index]
            return (
                <li>
                    <span>
                        <a href={path}>
                            {data.name}
                        </a>
                    </span>
                </li>
            )
        }`,
  },
}

module.exports = schema
