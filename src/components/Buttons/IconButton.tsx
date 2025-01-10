import React, { useState } from "react";
import * as styles from "./IconButton.module.css"; 

interface IconButtonProps {
  onClick: () => void;
  defaultIcon: string;
  hoverIcon?: string;
  altText?: string;
  hasCircle?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  defaultIcon,
  hoverIcon,
  altText = "icon",
  hasCircle,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => hoverIcon && setIsHovered(true)}
      onMouseLeave={() => hoverIcon && setIsHovered(false)}
      className={`${styles.iconButton} ${
        hasCircle ? styles.circle : ""
      } ${className}`}
    >
      <img
        src={isHovered ? hoverIcon : defaultIcon}
        alt={altText}
        className={styles.iconImage}
      />
    </button>
  );
};

export default IconButton;
