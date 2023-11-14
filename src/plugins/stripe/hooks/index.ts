import HookSystem from '../../../system/triggers/HookSystem'

export const registerHooks = () => {
  registerAdminPanelHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  HookSystem.getInstance().addHookCallback('beforeRenderAdminPanel', items => {
    return items.concat([
      {
        title: 'Stripe Payments',
        path: 'plugins/stripe',
        icon: 'dollar',
        subItems: [
          {
            title: 'Payment Methods',
            path: 'payment_methods/list',
          },
        ],
      },
    ])
  })
}
