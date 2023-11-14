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

const AdminMenu: React.FC = async () => {
  const user = await getCurrentUser()

  const items = user?.role === 'admin' ? adminMenuItemsTop : []
  const menuItemsAfterApplyingHooks = HookSystem.getInstance().executeHook(
    'beforeRenderAdminPanel',
    items,
  )
  const menuItems = menuItemsAfterApplyingHooks.concat(adminMenuItemsBottom)

  console.log('admin menu render server side')

  return <AdminMenuComponent menuItems={menuItems} />
}

export default AdminMenu
