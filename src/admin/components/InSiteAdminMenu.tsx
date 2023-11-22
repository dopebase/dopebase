import React from 'react'
import HookSystem from '../../system/triggers/HookSystem'
import InSiteAdminMenuComponent from './InSiteAdminMenu.client'

const adminMenuItemsTop = [
  {
    title: 'Dashboard',
    path: 'admin',
    subItems: [],
    icon: 'bar-chart-o',
  },
]

const InSiteAdminMenu = async ({ params, searchParams }) => {
  const { routes } = params
  const pluginItems = await HookSystem.getInstance().executeHook(
    'inSiteAdminMenu',
    [],
    routes,
  )
  const items = adminMenuItemsTop.concat(pluginItems)

  return <InSiteAdminMenuComponent menuItems={items} />
}

export default InSiteAdminMenu
