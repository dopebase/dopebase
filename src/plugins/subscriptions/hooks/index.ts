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
        title: 'SaaS',
        path: 'plugins/subscriptions',
        icon: 'dollar',
        subItems: [
          {
            title: 'Subscriptions',
            path: 'subscriptions/list',
          },
          {
            title: 'Plans',
            path: 'subscription_plans/list',
          },
          {
            title: 'Transactions',
            path: 'transactions/list',
          },
          {
            title: 'Payment Methods',
            path: 'payment_methods/list',
          },
        ],
      },
    ])
  })
}

const registerURLParserHooks = () => {
  /* Insert any hooks here */

  console.log('registering url parser hooks')
  HookSystem.getInstance().addHookCallback(
    'urlParsing',
    (initialValue, routes, searchParams) => {
      return getComponentForRoutes(routes, searchParams)
    },
  )
}
