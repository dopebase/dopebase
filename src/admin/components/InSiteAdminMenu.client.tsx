import React from 'react'

const InSiteAdminMenu = ({ menuItems, urlPath = 'admin' }) => {
  return (
    <div className="inSiteContainer">
      <h3>Admin Menu</h3>
      <ul className="inSiteMenuItemsList">
        {menuItems?.map((menuItem, index) => (
          <li key={menuItem.path}>
            {(menuItem.subItems?.length ?? 0) === 0 ? (
              <a href={`/${urlPath}/${menuItem.path}`}>
                <i className={`fa fa-${menuItem.icon}`} />
                {menuItem.title}
                <b className="caret" />
              </a>
            ) : (
              <>
                <p data-toggle="collapse" aria-expanded="false">
                  <i className={`fa fa-${menuItem.icon}`} />
                  {menuItem.title}
                  <b className="caret" />
                </p>
                <div className="inSiteSubmenu" id={menuItem.path}>
                  <ul className="nav">
                    {menuItem.subItems?.map((subitem, subindex) => (
                      <li key={subitem.title}>
                        <a
                          href={`/${urlPath}/${menuItem.path}/${subitem.path}`}>
                          {subitem.title}
                        </a>
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
  )
}

export default InSiteAdminMenu
