import React from "react";
import SearchBar from "../SearchBar";
import * as styles from "./Header.module.css";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.header}>
      <h1>Your tasks</h1>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default Header;
