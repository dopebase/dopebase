'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import useCurrentUser from '../../modules/auth/hooks/useCurrentUser'
import styles from '../themes/admin.module.css'

const adminMenuItems = [
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
  {
    title: 'Users',
    path: 'users',
    icon: 'user',
  },
  {
    title: 'Articles',
    path: 'articles',
    subItems: [
      { title: 'Articles', path: 'articles' },
      { title: 'Categories', path: 'categories' },
      { title: 'Tags', path: 'articleTags' },
    ],
    icon: 'font',
  },
  {
    title: 'E-mails',
    path: 'emails',
    subItems: [
      { title: 'Subscribers', path: 'emailSubscribers' },
      { title: 'Campaigns', path: 'emailCampaigns' },
      { title: 'Newsletters', path: 'newsletters' },
      { title: 'Job Queue', path: 'jobs' },
      { title: 'Settings', path: 'emailSettings' },
      { title: 'Subscriber Tags', path: 'emailSubscriberTags' },
      { title: 'Stats', path: 'emails' },
    ],
    icon: 'envelope-o',
  },
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

const AdminMenu: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedSubindex, setSelectedSubindex] = useState(0)
  const [user, , loading] = useCurrentUser()
  const menuItems = user?.role === 'admin' ? adminMenuItems : []

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
}

export default AdminMenu
