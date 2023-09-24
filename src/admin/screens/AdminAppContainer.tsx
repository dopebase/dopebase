// @ts-nocheck
"use client";
import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminMenu from "../components/AdminMenu";
import useCurrentUser from "../../modules/auth/hooks/useCurrentUser";
import styles from "../themes/admin.module.css";

interface AdminAppContainerProps {
  children: Node;
}

export const AdminAppContainer: React.FC = (props: AdminAppContainerProps) => {
  const [user, , loading] = useCurrentUser();
  const { children } = props;

  if (loading) {
    return <div>loading</div>;
  }

  if (user?.role === "admin") {
    return (
      <div className={styles.admin}>
        <AdminHeader />
        <div className={styles.adminContent}>
          <div className={styles.MainMenu}>
            <AdminMenu />
          </div>
          <div className={styles.MainPanel}>{children}</div>
        </div>
      </div>
    );
  }

  return <div>Sorry, you do not have permissions to access this page.</div>;
};
