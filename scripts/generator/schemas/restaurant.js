'use strict'

const schema = {
  categories: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      photo: { type: 'photo', required: true, displayName: 'Photo' },
    },
    displayName: 'Categories',
    tableName: 'restaurant_categories',
    singularName: 'category',
    singularCapitalName: 'Category',
    pluralName: 'categories',
    titleFieldKey: 'name',
  },
  deliveries: {
    fields: {
      orderID: {
        type: 'string',
        required: true,
        displayName: 'Order',
        foreignKey: 'orders',
        cellClassName: 'DeliveryOrder',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.id} {data.status}</span></td></tr></table>`,
          originalDataFormatter: `data.id + " " + data.status`,
        },
      },
      item: { type: 'string', required: true, displayName: 'Item' },
      eta: { type: 'string', required: true, displayName: 'ETA' },
      location: {
        type: 'simpleLocation',
        required: true,
        displayName: 'Location',
      },
    },
    displayName: 'Deliveries',
    tableName: 'restaurant_deliveries',
    singularName: 'delivery',
    singularCapitalName: 'Delivery',
    pluralName: 'deliveries',
    titleFieldKey: 'orderID',
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
      products: {
        type: 'array',
        subtype: 'objects',
        cellClassName: 'OrderFood',
        required: true,
        displayName: 'Foods',
        foreignKeys: 'foods',
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
      status: {
        type: 'enum',
        required: true,
        displayName: 'Status',
        enum: [
          'Order Completed',
          'Order Shipped',
          'In transit',
          'Order Accepted',
          'Order Placed',
          'Driver Pending',
          'Driver Rejected',
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
  foods: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      description: {
        type: 'string',
        required: true,
        displayName: 'Description',
      },
      price: { type: 'string', required: true, displayName: 'Price' },
      category: {
        type: 'string',
        required: true,
        displayName: 'Category',
        foreignKey: 'categories',
        cellClassName: 'FoodCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.photo} /></td><td><span>{data.name}</span></td></tr></table>`,
          originalDataFormatter: `data.name`,
        },
      },
      photo: { type: 'photo', required: true, displayName: 'Cover Photo' },
      details: { type: 'photos', required: true, displayName: 'Photos' },
    },
    displayName: 'Foods',
    tableName: 'restaurant_foods',
    singularName: 'food',
    singularCapitalName: 'Food',
    pluralName: 'foods',
    titleFieldKey: 'name',
  },
  reservations: {
    fields: {
      firstName: { type: 'string', required: true, displayName: 'First Name' },
      lastName: { type: 'string', required: true, displayName: 'Last Name' },
      phoneNumber: {
        type: 'string',
        required: true,
        displayName: 'Phone Number',
      },
      details: { type: 'string', required: true, displayName: 'Details' },
      // createdAt: { type: 'date', required: true, displayName: 'Date' },
    },
    displayName: 'Reservations',
    tableName: 'restaurant_reservations',
    singularName: 'reservation',
    singularCapitalName: 'Reservation',
    pluralName: 'reservations',
    titleFieldKey: 'lastName',
  },
  restaurants: {
    fields: {
      name: { type: 'string', required: true, displayName: 'Name' },
      description: {
        type: 'string',
        required: true,
        displayName: 'Description',
      },
      location: {
        type: 'simpleLocation',
        required: true,
        displayName: 'Location',
      },
      // createdAt: { type: 'date', required: true, displayName: 'Date' },
    },
    displayName: 'Restaurants',
    tableName: 'restaurants',
    singularName: 'restaurant',
    singularCapitalName: 'Restaurant',
    pluralName: 'restaurants',
    titleFieldKey: 'name',
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
    products: `{
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
  },
}

module.exports = schema
