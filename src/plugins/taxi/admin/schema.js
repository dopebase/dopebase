'use strict'

const schema = {
  taxi_trips: {
    fields: {
      id: { type: 'string', required: false, displayName: 'ID' },
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
          'trip_started',
          'trip_completed',
        ],
      },
      passenger: {
        type: 'object',
        required: true,
        displayName: 'Passenger',
        foreignKey: 'users',
        cellClassName: 'TaxiTripPassenger',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={unescapeString(data.profilePictureURL)} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      passengerID: {
        type: 'string',
        required: false,
        displayName: 'Passenger ID',
        foreignKey: 'users',
        cellClassName: 'TripPassenger',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><img src={unescapeString(data.profilePictureURL)} /></td><td><span>{data.firstName} {data.lastName} ({data.email})</span></td></tr></table>`,
          originalDataFormatter: `data.firstName + " " + data.lastName`,
        },
      },
      carType: {
        type: 'string',
        required: false,
        displayName: 'Car Type',
        foreignKey: 'taxi_car_categories',
        cellClassName: 'TripTaxiCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.name} ({data.description})</span></td></tr></table>`,
          originalDataFormatter: `data.name + " " + data.description`,
        },
      },
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
      id: { type: 'string', required: false, displayName: 'ID' },
      name: { type: 'string', required: false, displayName: 'Name' },
      description: {
        type: 'string',
        required: false,
        displayName: 'Description',
      },
      photo: {
        type: 'photo',
        required: false,
        displayName: 'Car Photo',
      },
      marker: {
        type: 'photo',
        required: false,
        displayName: 'Car Marker Icon',
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
        displayName: 'Max number of passengers',
      },
      averageSpeedPerMin: {
        type: 'string',
        required: false,
        displayName: 'Average speed per min (km / minute)',
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
      carType: {
        type: 'string',
        required: false,
        displayName: 'Car Type',
        foreignKey: 'taxi_car_categories',
        cellClassName: 'DriverTaxiCategory',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.name} ({data.description})</span></td></tr></table>`,
          originalDataFormatter: `data.name + " " + data.description`,
        },
      },
      inProgressOrderID: {
        type: 'string',
        required: false,
        displayName: 'In Progress Order ID',
        foreignKey: 'taxi_trips',
        cellClassName: 'DriverInProgressTrip',
        typeaheadRenderers: {
          dataItemRenderer: `<table key={data.id}><tr><td><span>{data.id}</span></td></tr></table>`,
          originalDataFormatter: `data.id + " - " + data.passenger.firstName + " " + data.passenger.lastName`,
        },
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
  mapRenderers: {
    passenger: `<li>
                    <a href={\`../users/view?id=\${data.id}\`}>
                       {data.firstName} {data.lastName}
                    </a>
                </li>`,
  },
}

module.exports = schema
