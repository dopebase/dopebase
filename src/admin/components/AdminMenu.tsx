import React from 'react'
import HookSystem from '../../system/triggers/HookSystem'
import { getCurrentUser } from '../utils/getCurrentUserByCookies'
import AdminMenuComponent from './AdminMenu.client'

const adminMenuItemsTop = [
  {
    title: 'Dashboard',
    path: '',
    subItems: [],
    icon: 'bar-chart-o',
  },
  {
    title: 'System',
    path: 'system',
    icon: 'gear',
    subItems: [
      {
        title: 'Settings',
        path: 'settings',
      },
      { title: 'Themes', path: 'themes' },
      { title: 'Plugins', path: 'plugins' },
    ],
  },
]

const adminMenuItemsBottom = [
  {
    title: 'My Account',
    path: 'system/settings/profile',
    subItems: [],
    icon: 'user-circle',
  },
  {
    title: 'Logout',
    path: '../logout',
    subItems: [],
    icon: 'sign-out',
  },
]

const AdminMenu = async ({ params, searchParams }) => {
  const user = await getCurrentUser()
  const { routes } = params
  const slug = routes.join('/')

  const items = user?.role === 'admin' ? adminMenuItemsTop : []
  const menuItemsAfterApplyingHooks = HookSystem.getInstance().executeHook(
    'beforeRenderAdminPanel',
    items,
  )
  const menuItems = menuItemsAfterApplyingHooks.concat(adminMenuItemsBottom)

  return <AdminMenuComponent menuItems={menuItems} slug={slug} />
}

export default AdminMenu
