import HookSystem from '../../../system/triggers/HookSystem'

export const registerHooks = () => {
  registerAdminPanelHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  HookSystem.getInstance().addHookCallback('beforeRenderAdminPanel', items => {
    return items.concat([
      {
        title: 'Social Network',
        path: 'plugins/social-network',
        icon: 'car',
        subItems: [
          {
            title: 'Posts',
            path: 'posts/list',
          },
          {
            title: 'Stories',
            path: 'stories/list',
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
