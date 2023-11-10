import hookSystem from '../../../system/triggers/HookSystem'
import { getComponentForRoutes } from '../lib/getComponentForRoutes'

export const registerHooks = () => {
  registerAdminPanelHooks()
  registerURLParserHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  hookSystem.addHookCallback('beforeRenderAdminPanel', items => {
    return items.concat([
      {
        title: 'SaaS',
        path: 'plugins/subscriptions',
        icon: 'dollar',
        subItems: [
          {
            title: 'Subscriptions',
            path: 'subscriptions/list',
          },
        ],
      },
    ])
  })
}

const registerURLParserHooks = () => {
  /* Insert any hooks here */

  console.log('registering url parser hooks')
  hookSystem.addHookCallback('urlParsing', (initialValue, routes) => {
    return getComponentForRoutes(routes)
  })
}
