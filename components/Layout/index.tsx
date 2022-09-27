import { Footer, Nav, Side } from "@components";
import React from "react";

import styles from "./Layout.module.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Nav />
      <Side />

      <div id="content">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export { Layout };
