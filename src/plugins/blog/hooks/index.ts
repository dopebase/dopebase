import hookSystem from '../../../system/triggers/HookSystem'

export const registerHooks = () => {
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
            icon: 'fa fa-newspaper-o',
          },
          {
            title: 'Categories',
            path: 'article_categories/list',
            icon: 'fa fa-newspaper-o',
          },
          {
            title: 'Tags',
            path: 'article_tags/list',
            icon: 'fa fa-newspaper-o',
          },
        ],
      },
    ])
  })
}
