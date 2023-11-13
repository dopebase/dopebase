import React from 'react'
import AdminMenuComponent from '../../../admin/components/AdminMenu.client'
import { getCurrentUser } from '../../../admin/utils/getCurrentUserByCookies'

const menuItems = [
  {
    title: 'Dashboard',
    path: '',
    subItems: [],
    icon: 'bar-chart-o',
  },
  {
    title: 'Subscription & Billing',
    path: 'subscriptions',
    subItems: [],
    icon: 'dollar',
  },
  {
    title: 'My Account',
    path: 'edit-profile',
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

const CustomerDashboardMenu: React.FC = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return <div>Access denied</div>
  }

  return <AdminMenuComponent menuItems={menuItems} urlPath="dashboard" />
}

export default CustomerDashboardMenu
