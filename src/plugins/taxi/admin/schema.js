'use strict'

const schema = {
  taxi_trips: {
    fields: {
      title: { type: 'string', required: false, displayName: 'Title' },
      pickup: {
        type: 'location',
        required: false,
        displayName: 'Pickup Location',
      },
      dropoff: {
        type: 'location',
        required: false,
        displayName: 'Dropoff Location',
      },
      status: {
        type: 'enum',
        required: true,
        displayName: 'Status',
        enum: [
          'awaiting_driver',
          'no_driver_found',
          'passenger_cancelled',
          'driver_rejected',
          'driver_accepted',
        ],
      },
      passenger: {
        type: 'string',
        required: false,
        displayName: 'Passenger',
        foreignKey: 'users',
        cellClassName: 'TripPassenger',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={data.profile_picture_url} /></td><td><span>{data.first_name} {data.last_name} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      carType: { type: 'string', required: false, displayName: 'Car Type' },
      priceRange: {
        type: 'string',
        required: false,
        displayName: 'Price Range',
      },
      ride: { type: 'object', required: false, displayName: 'Ride' },
      carDrive: {
        type: 'location',
        required: false,
        displayName: 'Current Location',
      },
      createdAt: { type: 'date', required: true, displayName: 'Created At' },
      updatedAt: { type: 'date', required: true, displayName: 'Updated At' },
    },
    pluralDisplayName: 'Rides',
    capitalPluralName: 'Trips',
    tableName: 'taxi_trips',
    lowercaseSingularName: 'taxi_trip',
    singularCapitalName: 'TaxiTrip',
    lowercasePluralName: 'taxi_trips',
    titleFieldKey: 'id',
  },
  taxi_car_categories: {
    fields: {
      name: { type: 'string', required: false, displayName: 'Name' },
      type: { type: 'string', required: false, displayName: 'Type' },
      description: {
        type: 'string',
        required: false,
        displayName: 'Description',
      },
      baseFare: { type: 'string', required: false, displayName: 'Base Fare' },
      costPerKm: {
        type: 'string',
        required: false,
        displayName: 'Cost per km',
      },
      costPerMin: {
        type: 'string',
        required: false,
        displayName: 'Cost per min',
      },
      minimumFare: {
        type: 'string',
        required: false,
        displayName: 'Minimum Fare',
      },
      numberOfPassengers: {
        type: 'string',
        required: false,
        displayName: 'Number of passengers',
      },
    },
    pluralDisplayName: 'Prices & Categories',
    capitalPluralName: 'TaxiCarCategories',
    tableName: 'taxi_car_categories',
    lowercaseSingularName: 'taxi_car_category',
    singularCapitalName: 'TaxiCarCategory',
    lowercasePluralName: 'taxi_car_categories',
    titleFieldKey: 'name',
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
      firstName: {
        type: 'string',
        required: false,
        displayName: 'First Name',
      },
      lastName: { type: 'string', required: false, displayName: 'Last Name' },
      phone: { type: 'string', required: false, displayName: 'Phone' },
      role: {
        type: 'enum',
        required: true,
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
      inProgressOrderID: {
        type: 'string',
        required: false,
        displayName: 'In Progress Order ID',
      },
      banned: {
        type: 'boolean',
        required: true,
        displayName: 'Banned',
      },
      createdAt: { type: 'date', required: true, displayName: 'Created At' },
      updatedAt: { type: 'date', required: true, displayName: 'Updated At' },
    },
  },
  mapRenderers: {},
}

module.exports = schema
