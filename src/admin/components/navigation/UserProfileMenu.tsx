// @ts-nocheck
'use client'
import { useRouter } from 'next/navigation'
import React, { useState, FunctionComponent, useEffect, memo } from 'react'
import useCurrentUser from '../../../modules/auth/hooks/useCurrentUser'
import useComponentVisible from '../hooks/useComponentVisible'
import { websiteURL } from '../../../config/config'
import styles from '../../themes/admin.module.css'

type ExpandedMenuProps = {
  isExpanded: boolean
  hide: any
}
const ExpandedMenu: FunctionComponent<ExpandedMenuProps> = ({
  isExpanded,
  hide,
}) => {
  const router = useRouter()
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(isExpanded)

  useEffect(() => {
    setIsComponentVisible(isExpanded)
  }, [isExpanded, setIsComponentVisible])

  useEffect(() => {
    if (isComponentVisible === false) {
      hide && hide()
    }
  }, [isComponentVisible])

  const logout = () => {
    router.push('/logout')
  }

  return (
    <>
      {isComponentVisible && (
        <div ref={ref} className={styles.profileExpandedMenu}>
          <ul>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      )}
    </>
  )
}

const UserProfileMenu: React.FC = memo(() => {
  const [user, , loading] = useCurrentUser()
  const [isExpanded, setIsExpanded] = useState(false)
  const onClick = () => {
    setIsExpanded(!isExpanded)
  }

  const hide = () => {
    setIsExpanded(false)
  }
  console.log(user)
  return (
    <>
      {!loading && user && (
        <>
          <a className={styles.navUserBox} onClick={onClick}>
            {user.firstName} {user.lastName}
            <i className="fa fa-user-circle" />
          </a>
          <ExpandedMenu isExpanded={isExpanded} hide={hide} />
        </>
      )}
      {!loading && !user && (
        <div className={styles.authLinksContainer}>
          <a className={styles.signupButton} href={`${websiteURL}register`}>
            Create Account
          </a>
          <a className={styles.loginButton} href={`${websiteURL}login`}>
            Login
          </a>
        </div>
      )}
    </>
  )
})

export default UserProfileMenu
