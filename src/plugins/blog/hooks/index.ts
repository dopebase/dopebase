import { get } from 'http'
import HookSystem from '../../../system/triggers/HookSystem'
import { getComponentForRoutes } from '../lib/getComponentForRoutes'
import { getAdminMenuForRoutes } from '../lib/getAdminMenuForRoutes'

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
    async (items, routes) => {
      var list = await getAdminMenuForRoutes(routes)
      return items.concat(list)
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
