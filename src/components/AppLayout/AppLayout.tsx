import React from "react";
import { streetImg } from "../../assets/images";
import * as styles from "./AppLayout.module.css";

interface CompositionProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<CompositionProps> = ({ children }) => {
  return (
    <div className={styles.layout} style={{ background: `url(${streetImg})` }}>
      {children}
    </div>
  );
};

export default AppLayout;
