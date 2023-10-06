'use client'

import React, { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import useCurrentUser from '../../modules/auth/hooks/useCurrentUser'
import styles from '../themes/admin.module.css'
import hookSystem from '../../system/triggers/HookSystem'

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
    icon: 'dollar',
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
    path: 'settings/profile',
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

const AdminMenu: React.FC = memo(() => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedSubindex, setSelectedSubindex] = useState(0)
  const [user, , loading] = useCurrentUser()
  const [menuItems, setMenuItems] = useState(null)

  console.log('admin menu render')

  useEffect(() => {
    if (menuItems === null && user) {
      const items = user?.role === 'admin' ? adminMenuItemsTop : []
      const menuItemsAfterApplyingHooks = hookSystem.executeHook(
        'beforeRenderAdminPanel',
        items,
      )
      console.log('menuItems', menuItems)
      setMenuItems(menuItemsAfterApplyingHooks.concat(adminMenuItemsBottom))
    }
  }, [menuItems, user?.id])

  const onSelect = (index, subindex) => {
    // const item = menuItems[index]
    // const hasSubitems = item.subItems?.length > 0
    // if (hasSubitems) {
    //   if (subindex !== -1) {

    //   }
    // }
    setSelectedIndex(index)
    setSelectedSubindex(subindex)
  }
  return (
    <div className={styles.MenuContainer}>
      <div className={styles.MenuBody}>
        <div className={styles.MenuItemsContainer}>
          <ul className={styles.MenuItemsList}>
            {menuItems?.map((menuItem, index) => (
              <li
                key={menuItem.path}
                className={
                  index === selectedIndex && menuItem.subItems?.length === 0
                    ? styles.selected
                    : ''
                }>
                {menuItem.subItems?.length === 0 ? (
                  <Link href={`/admin/${menuItem.path}`}>
                    <p
                      onClick={() => onSelect(index, -1)}
                      data-toggle={styles.collapse}
                      aria-expanded="false">
                      <i className={`fa fa-${menuItem.icon}`} />
                      {menuItem.title}
                      <b className="caret" />
                    </p>
                  </Link>
                ) : (
                  <>
                    <p
                      onClick={() => onSelect(index, -1)}
                      data-toggle={styles.collapse}
                      aria-expanded="false">
                      <i className={`fa fa-${menuItem.icon}`} />
                      {menuItem.title}
                      <b className="caret" />
                    </p>
                    <div className={styles.submenu} id={menuItem.path}>
                      <ul className="nav">
                        {menuItem.subItems?.map((subitem, subindex) => (
                          <li
                            key={subitem.title}
                            className={
                              index === selectedIndex &&
                              subindex === selectedSubindex
                                ? 'selected'
                                : ''
                            }>
                            <Link
                              href={`/admin/${menuItem.path}/${subitem.path}`}>
                              <p
                                className={styles.sidebarNormal}
                                onClick={() => onSelect(index, subindex)}>
                                {subitem.title}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
})

export default AdminMenu
