'use strict'

const schema = {
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
    capitalPluralName: 'articleCategories',
    pluralDisplayName: 'Article Categories',
    lowercasePluralName: 'article_categories',
    tableName: 'article_tag_categories',
    lowercaseSingularName: 'category',
    singularCapitalName: 'Category',
    titleFieldKey: 'name',
  },
  categories: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      photo: { type: 'photo', required: true, displayName: 'Cover Photo' },
      // color: { type: 'color', required: false, displayName: 'Color'},
    },
    displayName: 'Categories',
    tableName: 'shopertino_categories',
    singularName: 'category',
    singularCapitalName: 'Category',
    capitalPluralName: 'Categories',
    lowercasePluralName: 'categories',
    titleFieldKey: 'name',
  },
  products: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      photo: { type: 'photo', required: true, displayName: 'Cover Photo' },
      details: { type: 'photos', required: true, displayName: 'Photos' },
      price: { type: 'string', required: true, displayName: 'Price' },
      description: {
        type: 'string',
        required: true,
        displayName: 'Description',
      },
      category: {
        type: 'string',
        required: true,
        displayName: 'Category',
        foreignKey: 'categories',
        cellClassName: 'ProductCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
      colors: { type: 'colors', required: true, displayName: 'Colors' },
      sizes: {
        type: 'array',
        cellClassName: 'ProductSize',
        required: true,
        displayName: 'Sizes',
        subtype: 'enum',
        enum: ['S', 'M', 'L'],
      },
    },
    displayName: 'Products',
    tableName: 'shopertino_products',
    singularName: 'product',
    singularCapitalName: 'Product',
    lowercasePluralName: 'products',
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
  orders: {
    fields: {
      id: {
        type: 'string',
        editable: false,
        required: true,
        displayName: 'Order ID',
      },
      shippingAddress: {
        type: 'address',
        subtype: 'enum',
        required: true,
        displayName: 'Shipping Address',
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
      shopertino_products: {
        type: 'array',
        subtype: 'objects',
        cellClassName: 'OrderProduct',
        required: true,
        displayName: 'Products',
        foreignKeys: 'products',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
      totalPrice: {
        type: 'string',
        required: true,
        displayName: 'Total Price',
      },
      createdAt: { type: 'date', required: true, displayName: 'Date' },
      user_id: {
        type: 'string',
        required: true,
        displayName: 'Customer',
        foreignKey: 'users',
        cellClassName: 'OrderUser',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profilePictureURL} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      status: {
        type: 'enum',
        required: true,
        displayName: 'Status',
        enum: [
          'Order Placed',
          'Order Delivered',
          'Order Picked Up',
          'In traffic',
        ],
      },
    },
    displayName: 'Orders',
    tableName: 'shopertino_orders',
    singularName: 'order',
    singularCapitalName: 'Order',
    lowercasePluralName: 'orders',
    titleFieldKey: 'id',
    orderBy: {
      field: 'createdAt',
      desc: true,
    },
  },
  mapRenderers: {
    shopertino_products: `{
            const path = viewPath && viewPath[index]
            const quantity = data.quantity ? (' x ' + data.quantity): ' x 1'
            return (
                <li>
                    <span>
                        <a href={path}>
                            {data.name}
                        </a>
                        {quantity} {data.selectedColor} {data.selectedSize}
                    </span>
                </li>
            )
        }`,
    sizes: `{return (<li>{data}</li>)}`,
  },
}

module.exports = schema
