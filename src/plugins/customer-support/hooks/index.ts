import HookSystem from '../../../system/triggers/HookSystem'
import { getComponentForRoutes } from '../lib/getComponentForRoutes'

export const registerHooks = () => {
  registerAdminPanelHooks()
  registerURLParserHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  HookSystem.getInstance().addHookCallback('beforeRenderAdminPanel', items => {
    return items.concat([
      {
        title: 'Customer Support',
        path: 'plugins/customer-support',
        icon: 'dollar',
        subItems: [
          {
            title: 'Messages',
            path: 'ticket_messages/list',
          },
          {
            title: 'Tags',
            path: 'ticket_tags/list',
          },
          {
            title: 'Settings',
            path: 'settings/list',
          },
        ],
      },
    ])
  })
}

const registerURLParserHooks = () => {
  /* Insert any hooks here */

  HookSystem.getInstance().addHookCallback(
    'urlParsing',
    (initialValue, routes, searchParams) => {
      return getComponentForRoutes(routes, searchParams)
    },
  )
}
