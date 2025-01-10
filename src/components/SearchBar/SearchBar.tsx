import React from "react";
import { searchIcon } from "../../assets/icons";
import * as styles from "./SearchBar.module.css";


interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <img src={searchIcon} alt="search icon" />
        </span>
        <input
          type="text"
          placeholder={placeholder || "Поиск..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default SearchBar;
