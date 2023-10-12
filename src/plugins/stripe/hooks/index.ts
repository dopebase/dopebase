import hookSystem from '../../../system/triggers/HookSystem'

export const registerHooks = () => {
  registerAdminPanelHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  hookSystem.addHookCallback('beforeRenderAdminPanel', items => {
    return items.concat([
      {
        title: 'Stripe Payments',
        path: 'plugins/stripe',
        icon: 'fa fa-dollar-o',
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
