import HookSystem from '../../../system/triggers/HookSystem'
import { getComponentForRoutes } from '../lib/getComponentForRoutes'

export const registerHooks = () => {
  registerAdminPanelHooks()
  registerInSiteAdminMenuHooks()
  registerURLParserHooks()
}

const registerAdminPanelHooks = () => {
  /* Insert any admin hooks here */

  HookSystem.getInstance().addHookCallback('beforeRenderAdminPanel', items => {
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

const registerInSiteAdminMenuHooks = () => {
  HookSystem.getInstance().addHookCallback(
    'inSiteAdminMenu',
    (items, routes) => {
      return items.concat([
        {
          title: 'Edit',
          path: 'articles/update?id=' + routes[1].id,
          icon: 'pencil',
        },
      ])
    },
  )
}

const registerURLParserHooks = () => {
  /* Insert any hooks here */

  HookSystem.getInstance().addHookCallback(
    'urlParsing',
    async (initialValue, routes) => {
      return await getComponentForRoutes(routes)
    },
  )
}
