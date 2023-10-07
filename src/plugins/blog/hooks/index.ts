import hookSystem from '../../../system/triggers/HookSystem'

export const registerHooks = () => {
  registerAdminPanelHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  hookSystem.addHookCallback('beforeRenderAdminPanel', items => {
    return items.concat([
      {
        title: 'Blog',
        path: 'plugins/blog',
        icon: 'fa fa-newspaper-o',
        subItems: [
          {
            title: 'Posts',
            path: 'articles/list',
          },
          {
            title: 'Categories',
            path: 'article_categories/list',
          },
          {
            title: 'Users',
            path: 'users/list',
          },
          {
            title: 'Tags',
            path: 'article_tags/list',
          },
        ],
      },
    ])
  })
}
