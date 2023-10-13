import hookSystem from '../../../system/triggers/HookSystem'

export const registerHooks = () => {
  registerAdminPanelHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  hookSystem.addHookCallback('beforeRenderAdminPanel', items => {
    return items.concat([
      {
        title: 'Taxi',
        path: 'plugins/taxi',
        icon: 'car',
        subItems: [
          {
            title: 'Prices & Rides',
            path: 'taxi_car_categories/list',
          },
          {
            title: 'Rides',
            path: 'taxi_trips/list',
          },
          {
            title: 'Users',
            path: 'users/list',
          },
        ],
      },
    ])
  })
}
