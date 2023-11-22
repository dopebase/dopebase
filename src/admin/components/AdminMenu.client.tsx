'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../themes/admin.module.css'

const AdminMenu = ({ menuItems, urlPath = 'admin', slug }) => {
  const extractSelectedIndex = (menuItems, slug) => {
    let selectedIndex = 0
    let selectedSubindex = -1
    menuItems.forEach((menuItem, index) => {
      const path = menuItem.path.replace('plugins/', '')
      if (path === slug) {
        selectedIndex = index
        selectedSubindex = -1
      } else if (menuItem.subItems?.length > 0) {
        menuItem.subItems.forEach((subitem, subindex) => {
          const subpath = path + '/' + subitem.path
          if (subpath === slug) {
            selectedIndex = index
            selectedSubindex = subindex
          }
        })
      }
    })
    return [selectedIndex, selectedSubindex]
  }

  const [extractedIndex, extractedSubindex] = extractSelectedIndex(
    menuItems,
    slug,
  )

  const [selectedIndex, setSelectedIndex] = useState(extractedIndex)
  const [selectedSubindex, setSelectedSubindex] = useState(extractedSubindex)

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
                  <Link href={`/${urlPath}/${menuItem.path}`}>
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
                                ? styles.selected
                                : ''
                            }>
                            <Link
                              href={`/${urlPath}/${menuItem.path}/${subitem.path}`}>
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
