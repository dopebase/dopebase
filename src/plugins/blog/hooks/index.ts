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
        title: 'Blog',
        path: 'plugins/blog',
        icon: 'pencil',
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
            title: 'Tags',
            path: 'article_tags/list',
          },
          {
            title: 'AI Generator',
            path: 'article_ideas/list',
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

  console.log('registering url parser hooks')
  hookSystem.addHookCallback('urlParsing', (initialValue, routes) => {
    return getComponentForRoutes(routes)
  })
}
